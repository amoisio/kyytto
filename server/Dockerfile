FROM node:14-alpine
ARG CORS="http://localhost:8080"
ARG API_HOST="http://localhost"
ARG API_PORT="8090"
ARG FILENAME="kyytto-data.json"
WORKDIR /app
COPY ./dist ./dist
# COPY ./node_modules ./node_modules
# COPY package.json .
RUN mkdir ./data
VOLUME ./data
ENV CORS_ALLOW_ORIGIN=${CORS}
ENV API_SERVER_HOST=${API_HOST}
ENV API_SERVER_PORT=${API_PORT}
ENV LOWDB_FILENAME=${FILENAME}
EXPOSE ${API_PORT}
CMD ["node", "dist/server.js"]
