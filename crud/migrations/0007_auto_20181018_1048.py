# Generated by Django 2.1.2 on 2018-10-18 10:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('crud', '0006_auto_20181018_1041'),
    ]

    operations = [
        migrations.AlterField(
            model_name='member',
            name='gender',
            field=models.BooleanField(choices=[('M', 'Male'), ('F', 'Female')], max_length=1, verbose_name='Gender'),
        ),
    ]