# Generated by Django 5.0.1 on 2024-07-06 14:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('solar_player_api', '0004_alter_artist_image_alter_track_path'),
    ]

    operations = [
        migrations.AlterField(
            model_name='track',
            name='created_at',
            field=models.DateTimeField(auto_created=True),
        ),
    ]
