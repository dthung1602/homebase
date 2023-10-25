from django.contrib.auth import get_user_model
from django.contrib.auth.backends import BaseBackend

from user.userservice_proxy import UserServiceProxy


class RemoteAuthBackend(BaseBackend):
    def __init__(self):
        self.proxy = UserServiceProxy()
        self.UserClass = get_user_model()

    def authenticate(self, request, username=None, password=None, **kwargs):
        if username is None or password is None:
            return
        user_data = self.proxy.authenticate(username, password)
        if user_data is None:
            return
        user = self.UserClass(**user_data)
        return user

    def get_user(self, user_id):
        user = self.UserClass(**self.proxy.find(user_id))
        return user

    def get_user_permissions(self, user_obj, obj=None):
        return set(f"auth.{code}" for code in user_obj.permission_codes.split(","))

    def has_perm(self, user_obj, perm, obj=None):
        if user_obj.is_anonymous:
            return False
        if user_obj.is_superuser:
            return True
        _, perm = perm.split(".")
        return perm in user_obj.permission_codes

    def has_module_perms(self, user_obj, app_label):
        return True
