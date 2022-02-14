FROM nginx:1.21.6-alpine
WORKDIR /usr/share/nginx/html
COPY ./init.sh /init.sh
COPY ./dist .
EXPOSE 80
ENTRYPOINT [ "/init.sh" ]
CMD [ "nginx", "-g", "daemon off;" ]