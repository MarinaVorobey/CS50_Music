from django.contrib import admin
from .models import Track, CustomUser, Playlist, Artist

# Register your models here.
admin.site.register(CustomUser)
admin.site.register(Track)
admin.site.register(Playlist)
admin.site.register(Artist)
