FROM node:12.14.1-alpine AS builder

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build --prod

FROM nginx:1.17.8-alpine

COPY --from=builder /app/dist/* /usr/share/nginx/html/
