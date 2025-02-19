# Generated by Django 5.0.1 on 2024-07-09 13:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('solar_player_api', '0008_alter_playlist_tracks_alter_track_likes'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='likes',
            field=models.ManyToManyField(blank=True, related_name='user_likes', to='solar_player_api.track'),
        ),
    ]
