# Generated by Django 2.1.2 on 2018-10-24 11:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('crud', '0016_auto_20181024_1503'),
    ]

    operations = [
        migrations.RenameField(
            model_name='member',
            old_name='lastname',
            new_name='email',
        ),
    ]