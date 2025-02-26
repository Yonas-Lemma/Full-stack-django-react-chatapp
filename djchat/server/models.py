from django.conf import settings
from django.db import models
from django.dispatch import receiver
from django.shortcuts import get_object_or_404

from .validator import vallidater_image_file_exstension, vallidater_image_icon

# Create your models here.


def category_icon_path(instance, filename):
    return f"category/{instance.id}/category_icon/{filename}"


def server_icon_path(instance, filename):
    return f'server/{instance.id}/server_icons/{filename}'


def server_banner_path(instance, filename):
    return f'server/{instance.id}/server_banner/{filename}'


class Category(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(null=True, blank=True)
    icon = models.FileField(null=True, blank=True,
                            upload_to=category_icon_path)

    def save(self, *args, **kwargs):
        if self.pk:
            category_instance = get_object_or_404(Category, pk=self.pk)
            if category_instance.icon != self.icon:
                category_instance.icon.delete(save=False)
        super(Category, self).save(*args, **kwargs)

    @receiver(models.signals.pre_delete, sender="server.Category")
    def on_category_delete_file(sender, instance, **kwargs):
        for field in instance._meta.fields:
            if field.name == 'icon':
                file = getattr(instance, field.name)
                if file:
                    file.delete(save=False)

    def __str__(self):
        return self.name


class Server(models.Model):
    name = models.CharField(max_length=100)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL,
                              on_delete=models.CASCADE, related_name="server_owner")
    category = models.ForeignKey(
        Category, on_delete=models.CASCADE, related_name="server_category")
    description = models.CharField(max_length=50, null=True, blank=True)
    member = models.ManyToManyField(settings.AUTH_USER_MODEL)

    def __str__(self):
        return f"{self.name}-{self.id}"


class Channel(models.Model):
    name = models.CharField(max_length=100)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL,
                              on_delete=models.CASCADE, related_name="Channel_owner")
    topic = models.CharField(max_length=100)
    server = models.ForeignKey(
        Server, models.CASCADE, related_name="channel_server")
    banner = models.ImageField(null=True, blank=True,
                               upload_to=server_banner_path, validators=[vallidater_image_file_exstension])
    icon = models.ImageField(
        null=True, blank=True, upload_to=server_icon_path, validators=[vallidater_image_icon, vallidater_image_file_exstension])

    def save(self, *args, **kwargs):
        if self.pk:
            server_instance = get_object_or_404(Category, pk=self.pk)
            if server_instance.icon != self.icon:
                server_instance.icon.delete(save=False)
            if server_instance.banner != self.banner:
                server_instance.icon.delete(save=False)
        super(Category, self).save(*args, **kwargs)

    @receiver(models.signals.pre_delete, sender="server.Server")
    def on_category_delete_file(sender, instance, **kwargs):
        for field in instance._meta.fields:
            if field.name == 'icon' or 'banner':
                file = getattr(instance, field.name)
                if file:
                    file.delete(save=False)

    # def save(self, *args, **kwargs):
    #     self.name = self.name.lower()
    #     super(Channel, self).save(*args, **kwargs)

    def __str__(self):
        return self.name
