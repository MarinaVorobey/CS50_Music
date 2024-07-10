from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import (
    api_view,
    permission_classes,
    authentication_classes,
)

from .serializers import (
    CustomTokenObtainPairSerializer,
    RegisterSerializer,
    PlaylistSerializer,
    TrackSerializer,
    ArtistSerializer,
    PlaylistsSerializer,
    CreatePlaylistSerializer,
)
from .models import CustomUser, Track, Playlist, Artist


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class RegisterView(CreateAPIView):
    queryset = CustomUser.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


@api_view(["GET"])
@permission_classes([AllowAny])
def get_tracklist(request):
    q = request.GET
    if "query" in request.GET:
        tracks_query = Track.objects.filter(name__icontains=q["query"])
        artists = Artist.objects.filter(name__icontains=q["query"])
        artists_query = Track.objects.filter(artist__in=artists.values("id"))
        tracks = tracks_query | artists_query
    else:
        tracks = Track.objects.all()
    serializer = TrackSerializer(tracks, many=True, context={"request": request})
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def get_playlists(request):
    playlists = request.user.playlists.all().order_by("-id")
    serializer = PlaylistsSerializer(playlists, many=True)
    return Response(serializer.data)


@api_view(["GET", "PATCH", "DELETE"])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def playlist(request, playlist_id):
    try:
        playlist = Playlist.objects.get(pk=playlist_id)
    except Playlist.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if playlist.user != request.user:
        return Response(status=status.HTTP_403_FORBIDDEN)

    if request.method == "GET":
        serializer = PlaylistSerializer(playlist, context={"request": request})
        return Response(serializer.data)

    elif request.method == "PATCH":
        if not "track_id" in request.data:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        try:
            track = playlist.tracks.get(pk=request.data["track_id"])
            playlist.tracks.remove(track)
            playlist.save()
        except Track.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(status=status.HTTP_205_RESET_CONTENT)

    elif request.method == "DELETE":
        playlist.delete()
        return Response(status=status.HTTP_205_RESET_CONTENT)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def create_playlist(request):
    data = request.data
    data["user"] = request.user.id
    serializer = CreatePlaylistSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def toggle_like(request, track_id):
    try:
        track = Track.objects.get(pk=track_id)
    except Track.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if track in request.user.likes.all():
        request.user.likes.remove(track)
        track.likes.remove(request.user)
    else:
        request.user.likes.add(track)
        track.likes.add(request.user)

    request.user.save()
    track.save()
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def add_to_playlist(request, track_id):
    try:
        track = Track.objects.get(pk=track_id)
    except Track.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if not "playlist_ids" in request.data:
        return Response(status=status.HTTP_400_BAD_REQUEST)

    ids = request.data["playlist_ids"]
    for id in ids:
        try:
            playlist = Playlist.objects.get(pk=id)
        except Playlist.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        if playlist.user != request.user:
            return Response(status=status.HTTP_403_FORBIDDEN)

        playlist.tracks.add(track)
        playlist.save()

    return Response(status=status.HTTP_200_OK)


@api_view(["GET"])
@permission_classes([AllowAny])
def get_artist(request, artist_id):
    try:
        artist = Artist.objects.get(pk=artist_id)
    except Artist.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    tracks = Track.objects.filter(artist=artist)
    track_serializer = TrackSerializer(tracks, many=True, context={"request": request})
    artist_serializer = ArtistSerializer(artist, context={"tracks": track_serializer})
    return Response(artist_serializer.data)


# Music files
# from django.http import FileResponse


# class getSongData(APIView):
#     serializer_class=serializers.SongSerializer

#     def get(self, request, id, *args, **kwargs):
#         song = models.Song.objects.get(id=id)
#         return FileResponse(song.audio_file.open())
