import time

from django.core.management.base import BaseCommand
from django.db import connections
from django.db.utils import OperationalError
from psycopg2 import OperationalError as Psycopg2Error


class Command(BaseCommand):
    """Wait for db"""

    def handle(self, *args, **options):
        self.stdout.write("Waiting for database...")
        while True:
            try:
                db_conn = connections["default"]
                db_conn.cursor()
                break
            except (OperationalError, Psycopg2Error):
                self.stdout.write("Not up yet")
                time.sleep(1)
        self.stdout.write("Connected to db")
