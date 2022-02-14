FROM node:14-alpine
ARG PORT
RUN npm install -g http-server
WORKDIR /app
COPY ./dist ./dist
COPY ./node_modules ./node_modules
COPY package.json .
EXPOSE ${PORT}
CMD [ "http-server", "dist" ]