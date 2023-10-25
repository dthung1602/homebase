FROM python:3.11.6-slim-bookworm

# Env
ENV TERM linux                                                  \
ENV PYTHONUNBUFFERED 1

WORKDIR /app

# Install system packages
RUN apt-get update && \
    apt-get install postgresql-client make --yes  && \
    # clean up after install
    apt-get clean autoclean && \
    apt-get autoremove --yes && \
    rm -rf /var/lib/{apt,dpkg,cache,log}/

# Copy source code
COPY . /app

RUN pip install --upgrade pip \
    && pip install poetry==1.2.2 \
    && poetry config virtualenvs.create false \
    && poetry install
