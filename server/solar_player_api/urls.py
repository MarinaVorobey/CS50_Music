from rest_framework_simplejwt.views import TokenRefreshView, TokenBlacklistView
from django.urls import path

from . import views

urlpatterns = [
    path("login", views.CustomTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("login/refresh", TokenRefreshView.as_view(), name="token_refresh"),
    path("register", views.RegisterView.as_view(), name="auth_register"),
    path("logout", TokenBlacklistView.as_view(), name="auth_logout"),
    path("tracks", views.get_tracklist, name="tracklist"),
    path("like/<int:track_id>", views.toggle_like, name="like_track"),
    path("playlists", views.get_playlists, name="playlists"),
    path("playlist/<int:playlist_id>", views.playlist, name="playlist"),
    path("playlists/add/<int:track_id>", views.add_to_playlist, name="add_to_playlist"),
    path("create/playlist", views.create_playlist, name="create_playlist"),
    path("artist/<int:artist_id>", views.get_artist, name="artist"),
    path("favorites", views.get_favorites, name="favorites"),
]
