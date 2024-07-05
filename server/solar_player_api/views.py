from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
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
from django.db.models import Q

from .serializers import (
    CustomTokenObtainPairSerializer,
    RegisterSerializer,
    PlaylistSerializer,
    TrackSerializer,
)
from .models import CustomUser, Track, Playlist


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class RegisterView(CreateAPIView):
    queryset = CustomUser.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


@api_view(["GET"])
def get_tracklist(request):
    q = request.GET
    if "query" in request.GET:
        tracks = Track.objects.filter(
            Q(name__icontains=q["query"]) | Q(artist__icontains=q["query"])
        )
    else:
        tracks = Track.objects.all()
    serializer = TrackSerializer(tracks, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def get_playlists(request):
    playlists = request.user.playlists.all().order_by("-created_at")
    serializer = PlaylistSerializer(playlists, many=True)
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
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    if request.method == "GET":
        serializer = PlaylistSerializer(playlist)
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
        return Response(status=status.HTTP_200_OK)

    elif request.method == "DELETE":
        playlist.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def create_playlist(request):
    serializer = PlaylistSerializer(user=request.user, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def toggle_like(request, track_id):
    try:
        track = Track.objects.get(pk=track_id)
    except Track.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if track in request.user.likes:
        request.user.likes.remove(track)
        track.likes.remove(request.user)
    else:
        request.user.likes.add(track)
        track.likes.add(request.user)

    request.user.save()
    track.save()
    return Response(status=status.HTTP_200_OK)


@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def add_to_playlist(request, pk):
    try:
        track = Track.objects.get(pk=pk)
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
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        playlist.tracks.add(track)
        playlist.save()

    return Response(status=status.HTTP_200_OK)
