import requests
from django.conf import settings


class UserServiceProxy:
    def __init__(self):
        endpoint = settings.USER_SERVICE["ENDPOINT"]
        self.base_url = f"{endpoint}/users"
        self.session = requests.Session()

    def create(self, data: dict) -> dict:
        res = self.session.post(
            url=f"{self.base_url}/",
            json=data,
        )
        res.raise_for_status()
        return res.json()

    def find(self, user_id: int) -> dict:
        res = self.session.get(url=f"{self.base_url}/{user_id}")
        res.raise_for_status()
        return res.json()

    def search(self, page: int, per_page: int) -> dict:
        res = self.session.get(url=f"{self.base_url}?page={page}&perPage={per_page}")
        res.raise_for_status()
        return res.json()

    def update(self, user_id: int, data: dict) -> dict:
        res = self.session.patch(
            url=f"{self.base_url}/{user_id}",
            json=data,
        )
        res.raise_for_status()
        return res.json()

    def delete(self, user_id: int):
        res = self.session.delete(url=f"{self.base_url}/{user_id}")
        res.raise_for_status()

    def authenticate(self, email: str, password: str) -> dict | None:
        res = self.session.post(
            url=f"{self.base_url}/auth",
            json={
                "email": email,
                "password": password,
            },
        )
        res.raise_for_status()
        return res.json()
