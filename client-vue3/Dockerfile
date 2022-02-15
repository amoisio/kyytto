FROM nginx:1.21.6-alpine
ARG SCHEME
ARG HOST
ARG PORT
WORKDIR /usr/share/nginx/html
COPY ./init.sh /init.sh
COPY ./dist .
ENV VUE_APP_API_SERVER_SCHEME=${SCHEME}
ENV VUE_APP_API_SERVER_HOST=${HOST}
ENV VUE_APP_API_SERVER_PORT=${PORT}
EXPOSE 80
ENTRYPOINT [ "/init.sh" ]
CMD [ "nginx", "-g", "daemon off;" ]