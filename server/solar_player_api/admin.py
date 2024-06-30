from django.contrib import admin
from .models import Track, CustomUser, Playlist

# Register your models here.
admin.site.register(Track)
admin.site.register(CustomUser)
admin.site.register(Playlist)
