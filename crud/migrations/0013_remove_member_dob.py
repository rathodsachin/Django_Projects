# Generated by Django 2.1.2 on 2018-10-24 05:47

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('crud', '0012_member_dob'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='member',
            name='dob',
        ),
    ]