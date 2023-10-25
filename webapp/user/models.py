from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models

from user.userservice_proxy import UserServiceProxy


class UserManager(BaseUserManager):
    def __init__(self):
        self.proxy = UserServiceProxy()
        self.name = "users"


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    is_staff = models.BooleanField(default=False)  # type: ignore
    is_active = models.BooleanField(default=True)  # type: ignore
    permission_codes = models.CharField(max_length=511)
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()

    objects = UserManager()
    USERNAME_FIELD = "email"

    def __str__(self):
        return self.email

    def save(self, *args, **kwargs):
        if self.id:  # type: ignore
            self.__class__.objects.proxy.update(
                self.id,  # type: ignore
                {
                    "email": self.email,
                    "name": self.name,
                    "is_staff": self.is_staff,
                    "is_superuser": self.is_superuser,
                    "permission_codes": self.permission_codes,
                },
            )
        else:
            self.__class__.objects.proxy.create(
                {
                    "email": self.email,
                    "name": self.name,
                    "is_staff": self.is_staff,
                    "is_superuser": self.is_superuser,
                    "permission_codes": self.permission_codes,
                }
            )
