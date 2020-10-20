FROM cypress/base:12.1.0 as builder
WORKDIR '/app'
COPY package.json package-lock.json ./
ENV CI=1
RUN npm ci
RUN npx cypress verify
RUN npm install -D cypress-xpath
# Add dockerize tool -------------------
ENV DOCKERIZE_VERSION v0.6.0
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz
