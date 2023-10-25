from unittest.mock import MagicMock, patch

from django.conf import settings
from django.test import SimpleTestCase

from user.userservice_proxy import UserServiceProxy


@patch("user.userservice_proxy.requests.Session")
class TestUserServiceProxy(SimpleTestCase):
    def setUp(self):
        settings.USER_SERVICE["ENDPOINT"] = "http://test:3000"
        super().setUp()

    def test_create(self, mock_session: MagicMock):
        mock_session().post().json.return_value = {"id": 1, "foo": "bar"}
        proxy = UserServiceProxy()

        res = proxy.create({"foo": "bar"})

        self.assertEqual({"id": 1, "foo": "bar"}, res)
        mock_session().post().raise_for_status.assert_any_call()
        mock_session().post.assert_any_call(url="http://test:3000/users/", json={"foo": "bar"})

    # TODO add more tests
