# Generated by Django 3.2.4 on 2021-06-22 05:43

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('socialForm', '0007_auto_20210622_0539'),
    ]

    operations = [
        migrations.AlterField(
            model_name='form',
            name='created_at',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]
