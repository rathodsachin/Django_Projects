# Generated by Django 2.1.2 on 2018-10-18 10:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('crud', '0002_member_gender'),
    ]

    operations = [
        migrations.AlterField(
            model_name='member',
            name='gender',
            field=models.CharField(choices=[('true', 'Male'), ('false', 'Female')], max_length=1, null=True),
        ),
    ]
