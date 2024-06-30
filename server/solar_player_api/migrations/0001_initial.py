# Generated by Django 5.0.1 on 2024-06-30 14:56

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CustomUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Track',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateField(auto_created=True)),
                ('name', models.CharField(max_length=150)),
                ('path', models.FilePathField()),
                ('image', models.FilePathField()),
                ('duration', models.DurationField()),
                ('album', models.CharField(max_length=256)),
                ('artist', models.CharField(max_length=256)),
                ('likes', models.ManyToManyField(blank=True, related_name='track_likes', to='solar_player_api.customuser')),
            ],
        ),
        migrations.CreateModel(
            name='Playlist',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateField(auto_created=True)),
                ('name', models.CharField(max_length=150)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='playllist_user', to='solar_player_api.customuser')),
                ('tracks', models.ManyToManyField(blank=True, related_name='playlist_tracks', to='solar_player_api.track')),
            ],
        ),
        migrations.AddField(
            model_name='customuser',
            name='last_listened',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='solar_player_api.track'),
        ),
        migrations.AddField(
            model_name='customuser',
            name='likes',
            field=models.ManyToManyField(blank=True, related_name='user_likes', to='solar_player_api.track'),
        ),
    ]
