FROM nginx:1.25.1-alpine

ARG DOMAIN

COPY ./docker/webserver/prod.conf /etc/nginx/conf.d/default.conf

RUN sed -i "s/staging/${DOMAIN}/g" /etc/nginx/conf.d/default.conf


