FROM node:12-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install && npm install -g nodemon

ARG NODE_ENV

COPY . .

CMD ["npm", "start"]
