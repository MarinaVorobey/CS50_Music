from rest_framework_simplejwt.views import TokenRefreshView, TokenBlacklistView
from django.urls import path, include

from . import views

auth_patterns = [
    path("login", views.CustomTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("login/refresh", TokenRefreshView.as_view(), name="token_refresh"),
    path("register", views.RegisterView.as_view(), name="auth_register"),
    path("logout", TokenBlacklistView.as_view(), name="auth_logout"),
]

urlpatterns = [
    path("", include(auth_patterns)),
    path("tracks", views.get_tracklist, name="tracklist"),
    path("track/<int:track_id>", views.track, name="track"),
    path("track/<int:track_id>/like", views.toggle_like, name="like_track"),
    path("playlists", views.get_playlists, name="playlists"),
    path("playlists/add/<int:track_id>", views.add_to_playlist, name="add_to_playlist"),
    path("playlists/create", views.create_playlist, name="create_playlist"),
    path("playlist/<int:playlist_id>", views.playlist, name="playlist"),
    path("artist/<int:artist_id>", views.get_artist, name="artist"),
    path("favorites", views.get_favorites, name="favorites"),
]
