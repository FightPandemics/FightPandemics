FROM node:12-alpine as builder
WORKDIR '/app'
COPY package.json package-lock.json ./
RUN npm install
COPY . .

FROM nginx
COPY --from=builder /app/build /usr/share/nginx/html
