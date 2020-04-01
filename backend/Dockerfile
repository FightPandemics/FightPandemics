FROM node:slim

WORKDIR /app

COPY package.json .

COPY package-lock.json .

RUN npm install && npm install -g nodemon

ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}

COPY . .

CMD ["npm", "run", "server"]