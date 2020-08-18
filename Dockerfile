FROM node:12.18.3-slim as builder
COPY ./package.json /web/package.json
WORKDIR /web
RUN npm install
COPY . /web
RUN npm run ng build -- --prod

FROM nginx:1.19.2-alpine

COPY ./nginx.conf /etc/nginx/nginx.conf

## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy from the stahg 1
COPY --from=builder /web/dist/videoCall/ /usr/share/nginx/html/

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]

