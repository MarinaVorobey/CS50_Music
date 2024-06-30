from rest_framework import serializers

from models import Track, CustomUser, Playlist


class TrackSerializer(serializers.ModelSerializer):

    class Meta:
        model = Track
        fields = "__all__"
        read_only_fields = ["id", "created_at"]


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        fields = "__all__"
        read_only_fields = ["id"]


class PlaylistSerializer(serializers.ModelSerializer):

    class Meta:
        model = Playlist
        fields = "__all__"
        read_only_fields = ["id", "created_at", "user"]
