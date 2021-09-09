# Generated by Django 3.2.4 on 2021-06-10 21:23

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='GoogleUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Form',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=150)),
                ('summary', models.TextField(max_length=350)),
                ('details', models.TextField(max_length=350)),
                ('file_url', models.JSONField(blank=True, null=True)),
                ('likes', models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(0)])),
                ('dislikes', models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(0)])),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('body_content', models.TextField(max_length=250)),
                ('form', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='socialForm.form')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
