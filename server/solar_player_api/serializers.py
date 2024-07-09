from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import Track, CustomUser, Playlist, Artist


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["id", "username"]
        read_only_fields = ["id"]


class TrackSerializer(serializers.ModelSerializer):
    liked = serializers.SerializerMethodField()

    class Meta:
        model = Track
        exclude = ["likes", "path"]
        read_only_fields = ["id", "created_at"]

    def get_liked(self, validated_data):
        request = self.context["request"]
        return request.user and request.user in validated_data.likes.all()


class PlaylistSerializer(serializers.ModelSerializer):

    class Meta:
        model = Playlist
        exclude = ["created_at"]
        read_only_fields = ["id"]


class ArtistSerializer(serializers.ModelSerializer):
    tracks = serializers.SerializerMethodField()

    class Meta:
        model = Artist
        fields = "__all__"
        read_only_fields = ["id"]

    def get_tracks(self, _):
        return self.context["tracks"].data


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["username"] = user.username

        return token


class RegisterSerializer(serializers.ModelSerializer):
    username = serializers.CharField(
        required=True,
        validators=[UniqueValidator(queryset=CustomUser.objects.all())],
    )
    password = serializers.CharField(
        write_only=True, required=True, validators=[lambda password: len(password) > 5]
    )
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = CustomUser
        fields = ("username", "password", "password2")

    def validate(self, attrs):
        if attrs["password"] != attrs["password2"]:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."}
            )

        return attrs

    def create(self, validated_data):
        user = CustomUser.objects.create(username=validated_data["username"])

        user.set_password(validated_data["password"])
        user.save()

        return user
