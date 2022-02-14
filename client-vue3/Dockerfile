FROM node:14-alpine
ARG PORT
ARG API_HOST="http://localhost"
ARG API_PORT="8090"
RUN npm install -g http-server
WORKDIR /app
COPY ./dist ./dist
COPY ./node_modules ./node_modules
COPY package.json .
ENV VUE_APP_API_SERVER_HOST=${API_HOST}
ENV VUE_APP_API_SERVER_PORT=${API_PORT}
EXPOSE ${PORT}
CMD [ "http-server", "dist" ]