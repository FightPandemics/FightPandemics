FROM node:slim

WORKDIR /app

COPY . .

RUN npm install

RUN npm rebuild node-sass

CMD ["npm", "start"]