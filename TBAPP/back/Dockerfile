# pull official base image
FROM python:3.8.0-alpine

# set work directory
RUN mkdir -p /usr/src/back 
WORKDIR /usr/src/back

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install dependencies
RUN apk update && apk add postgresql-dev gcc python3-dev musl-dev libressl-dev libffi-dev
RUN pip install --upgrade pip
COPY ./requirements.txt /usr/src/back/requirements.txt
RUN pip install --upgrade pip \
 && pip install -r requirements.txt

COPY . .