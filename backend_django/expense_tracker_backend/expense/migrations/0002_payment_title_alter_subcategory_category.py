# Generated by Django 4.1.2 on 2022-10-06 16:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('expense', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='payment',
            name='title',
            field=models.CharField(default='Dummy', max_length=250),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='subcategory',
            name='category',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sub_categories', to='expense.category'),
        ),
    ]