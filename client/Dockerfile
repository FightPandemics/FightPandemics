FROM node:12-alpine

WORKDIR /app

COPY . .

RUN npm install

RUN npm rebuild node-sass

CMD ["npm", "start"]
