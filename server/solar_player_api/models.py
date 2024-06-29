from django.contrib.auth.models import AbstractUser
from django.db import models


# Create your models here.
class User(AbstractUser):
    likes = models.ManyToManyField("Track", blank=True, related_name="user_likes")
    last_listened = models.ForeignKey("Track", on_delete=models.CASCADE)


class Track(models.Model):
    name = models.CharField(max_length=150)
    path = models.FilePathField()
    image = models.FilePathField()
    duration = models.DurationField()
    created_at = models.DateField(auto_created=True)
    album = models.CharField(max_length=256)
    artist = models.CharField(max_length=256)
    likes = models.ManyToManyField(User, blank=True, related_name="track_likes")


class Playlist(models.Model):
    name = models.CharField(max_length=150)
    created_at = models.DateField(auto_created=True)
    user = models.ForeignKey(User, related_name="playllist_user")
    tracks = models.ManyToManyField(Track, blank=True, related_name="playlist_tracks")
