# Generated by Django 2.1.2 on 2018-10-24 07:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('crud', '0014_member_dob'),
    ]

    operations = [
        migrations.AddField(
            model_name='member',
            name='bgroup',
            field=models.CharField(choices=[('A', 'A'), ('B', 'B'), ('AB', 'AB'), ('O', 'O')], default='B', max_length=6),
        ),
    ]