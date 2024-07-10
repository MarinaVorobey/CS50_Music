from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models
import os
import CS50_Music.settings as settings


def artists_path():
    return os.path.join(settings.MEDIA_ROOT, "artists")


def tracks_path():
    return os.path.join(settings.MEDIA_ROOT, "tracks")


class CustomUser(AbstractUser):
    first_name = None
    last_name = None
    likes = models.ManyToManyField("Track", blank=True, related_name="user_likes")
    last_listened = models.ForeignKey("Track", null=True, on_delete=models.SET_NULL)


class Track(models.Model):
    name = models.CharField(max_length=150)
    path = models.FilePathField(path=tracks_path())
    duration = models.DurationField()
    created_at = models.DateTimeField(auto_now_add=True)
    album = models.CharField(max_length=256, blank=True)
    artist = models.ForeignKey(
        "Artist", on_delete=models.CASCADE, related_name="track_artist"
    )
    likes = models.ManyToManyField(CustomUser, blank=True, related_name="track_likes")

    def __str__(self):
        return f"{self.name} - {self.artist}"


class Playlist(models.Model):
    name = models.CharField(max_length=150)
    created_at = models.DateField(auto_now_add=True)
    user = models.ForeignKey(
        CustomUser, related_name="playlists", on_delete=models.CASCADE
    )
    cover = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(8)], default=1
    )
    tracks = models.ManyToManyField(Track, blank=True, related_name="playlist_tracks")


class Artist(models.Model):
    name = models.CharField(max_length=150)
    image = models.FilePathField(blank=True, path=artists_path())

    def __str__(self):
        return self.name
