from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models


class CustomUser(AbstractUser):
    first_name = None
    last_name = None
    likes = models.ManyToManyField("Track", related_name="user_likes")
    last_listened = models.ForeignKey("Track", null=True, on_delete=models.SET_NULL)


class Track(models.Model):
    name = models.CharField(max_length=150)
    path = models.FilePathField()
    image = models.FilePathField(blank=True)
    duration = models.DurationField()
    created_at = models.DateField(auto_created=True)
    album = models.CharField(max_length=256, blank=True)
    artist = models.CharField(max_length=256)
    likes = models.ManyToManyField(CustomUser, blank=True, related_name="track_likes")


class Playlist(models.Model):
    name = models.CharField(max_length=150)
    created_at = models.DateField(auto_created=True)
    user = models.ForeignKey(
        CustomUser, related_name="playlists", on_delete=models.CASCADE
    )
    cover = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(8)], default=1
    )
    tracks = models.ManyToManyField(Track, blank=True, related_name="playlist_tracks")
