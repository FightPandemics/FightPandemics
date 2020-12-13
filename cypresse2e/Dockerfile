FROM cypress/included:6.0.1 as builder
WORKDIR '/app'
COPY package.json package-lock.json ./
ENV CI=1
RUN npm ci
RUN npx cypress verify
# Add dockerize tool -------------------
ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz
