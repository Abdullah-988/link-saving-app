# Generated by Django 4.2.9 on 2024-02-05 23:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='link',
            name='description',
            field=models.CharField(blank=True, max_length=500),
        ),
    ]