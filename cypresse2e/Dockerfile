FROM cypress/base:10 as builder
WORKDIR '/app'
COPY package.json package-lock.json ./
ENV CI=1
RUN npm ci
RUN npx cypress verify