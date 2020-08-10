FROM node:12-alpine as builder
WORKDIR '/app'
COPY package.json package-lock.json ./
# Install mocha
RUN npm install --global mocha

# Install dependencies
RUN npm install --save-dev should supertest chai http-status

#Add dockerize tool -------------------
ENV DOCKERIZE_VERSION v0.6.0
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
     && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
     && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz