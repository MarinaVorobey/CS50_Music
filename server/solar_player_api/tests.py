from django.test import TestCase, Client
from rest_framework_simplejwt.tokens import AccessToken
import CS50_Music.settings as settings

from .models import CustomUser, Track, Playlist, Artist

import os
from datetime import timedelta


def tracks_path():
    return os.path.join(settings.MEDIA_ROOT, "tracks")


class SolarPlayerApiTestCase(TestCase):

    def setUp(self):
        user1 = CustomUser.objects.create(
            username="1", email="a@a.com", password="234567"
        )
        user2 = CustomUser.objects.create(
            username="2", email="b@b.com", password="123456"
        )
        self.token = AccessToken.for_user(user1)

        artist1 = Artist.objects.create(name="Ed Sheeran", image=f"Ed Sheeran.jpeg")
        artist2 = Artist.objects.create(
            name="Declan McKenna", image=f"Declan McKenna.webp"
        )

        track1 = Track.objects.create(
            name="Bad Habits",
            path=f"{tracks_path()}/media/tracks/Ed Sheeran Bad Habits.mp3",
            duration=timedelta(minutes=3, seconds=50),
            album="=",
            artist=artist1,
        )
        track2 = Track.objects.create(
            name="Green Green Grass Of Home",
            path=f"{tracks_path()}/media/tracks/George Jones Green Green Grass Of Home.mp3",
            duration=timedelta(minutes=2, seconds=57),
            album="20 Original Musicor Recordings",
            artist=artist2,
        )

        playlist1 = Playlist.objects.create(name="Test1", cover=3, user=user1)
        playlist1.tracks.set([track1])
        playlist2 = Playlist.objects.create(name="Test2", cover=4, user=user2)
        playlist2.tracks.set([track2])

    def test_tracks(self):
        c = Client()
        response = c.get("/tracks")
        self.assertEqual(response.status_code, 200)

    def test_artist(self):
        c = Client()
        response = c.get("/artist/1")
        self.assertEqual(response.status_code, 200)

    def test_invalid_artist(self):
        c = Client()
        response = c.get("/artist/1000")
        self.assertEqual(response.status_code, 404)

    def test_likes(self):
        c = Client()
        response = c.patch("/track/1/like")
        self.assertEqual(response.status_code, 401)

        response = c.patch(
            "/track/1/like", headers={"Authorization": f"Bearer {self.token}"}
        )
        self.assertEqual(response.status_code, 200)

        t1 = Track.objects.get(pk=1)
        self.assertEqual(t1.likes.all().count(), 1)

        response = c.patch(
            "/track/1/like", headers={"Authorization": f"Bearer {self.token}"}
        )
        t1 = Track.objects.get(pk=1)
        self.assertEqual(t1.likes.all().count(), 0)

    def test_playlists(self):
        c = Client()
        response = c.get("/playlists")
        self.assertEqual(response.status_code, 401)

        response = c.get(
            "/playlists",
            headers={"Authorization": f"Bearer {self.token}"},
        )
        self.assertEqual(response.status_code, 200)

    def test_playlist(self):
        c = Client()
        response = c.get(
            f"/playlist/1",
        )
        self.assertEqual(response.status_code, 401)

        response = c.get(
            "/playlist/1",
            headers={"Authorization": f"Bearer {self.token}"},
        )
        self.assertEqual(response.status_code, 200)

        response = c.get(
            "/playlist/2",
            headers={"Authorization": f"Bearer {self.token}"},
        )
        self.assertEqual(response.status_code, 403)

        response = c.get(
            "/playlist/1000",
            headers={"Authorization": f"Bearer {self.token}"},
        )
        self.assertEqual(response.status_code, 404)

        response = c.patch(
            "/playlist/1",
            {"track_id": "1"},
            headers={"Authorization": f"Bearer {self.token}"},
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 205)

        response = c.delete(
            "/playlist/1",
            headers={"Authorization": f"Bearer {self.token}"},
        )
        self.assertEqual(response.status_code, 205)

    def test_create_playlist(self):
        u1 = CustomUser.objects.get(pk=1)
        c = Client()
        response = c.get("/playlists/create")
        self.assertEqual(response.status_code, 401)

        response = c.post(
            "/playlists/create",
            {"name": "Test3", "cover": 1, "user": u1},
            headers={"Authorization": f"Bearer {self.token}"},
        )
        self.assertEqual(response.status_code, 201)
