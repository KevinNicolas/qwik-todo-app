FROM node:18-alpine

RUN mkdir /root/.ssh/
COPY ./.devcontainer/.ssh/* /root/.ssh/
RUN chmod 400 /root/.ssh/*

COPY . /app
WORKDIR /app