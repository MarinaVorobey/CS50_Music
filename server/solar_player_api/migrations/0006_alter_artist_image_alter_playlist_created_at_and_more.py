# Generated by Django 5.0.1 on 2024-07-07 13:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('solar_player_api', '0005_alter_track_created_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='artist',
            name='image',
            field=models.FilePathField(blank=True, path='E:\\projects_true\\training\\cs50\\Web_programming\\final_project\\CS50_Music\\server\\media\\artists'),
        ),
        migrations.AlterField(
            model_name='playlist',
            name='created_at',
            field=models.DateField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='track',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='track',
            name='path',
            field=models.FilePathField(path='E:\\projects_true\\training\\cs50\\Web_programming\\final_project\\CS50_Music\\server\\media\\tracks'),
        ),
    ]
