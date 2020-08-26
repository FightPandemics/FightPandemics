FROM node:12-alpine as builder
ARG GIT_COMMIT
ARG NODE_ENV
WORKDIR '/app'
COPY package.json package-lock.json ./
RUN npm install --production
COPY . .
RUN echo "{\"version\": \"$GIT_COMMIT\"}" > version.json

FROM builder
USER node
COPY --from=builder --chown=node:node /app .
CMD ["npm", "run", "dev"]
