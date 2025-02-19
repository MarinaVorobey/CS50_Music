# Generated by Django 5.0.1 on 2024-07-05 18:38

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('solar_player_api', '0002_alter_track_path'),
    ]

    operations = [
        migrations.CreateModel(
            name='Artist',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150)),
                ('image', models.FilePathField(blank=True)),
            ],
        ),
        migrations.RemoveField(
            model_name='track',
            name='image',
        ),
        migrations.AlterField(
            model_name='track',
            name='path',
            field=models.CharField(max_length=300),
        ),
        migrations.AlterField(
            model_name='track',
            name='artist',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='track_artist', to='solar_player_api.artist'),
        ),
    ]
