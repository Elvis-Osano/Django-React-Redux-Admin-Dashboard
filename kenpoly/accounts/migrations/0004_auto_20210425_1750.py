# Generated by Django 3.1 on 2021-04-25 14:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0003_auto_20210421_0351'),
    ]

    operations = [
        migrations.RenameField(
            model_name='useraccount',
            old_name='name',
            new_name='first_name',
        ),
        migrations.AddField(
            model_name='useraccount',
            name='last_name',
            field=models.CharField(default='', max_length=50),
            preserve_default=False,
        ),
    ]