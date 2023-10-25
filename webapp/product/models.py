from django.db import models


class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(max_length=2000)
    stock = models.PositiveIntegerField()
    image = models.URLField(max_length=1023)
