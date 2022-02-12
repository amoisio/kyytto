FROM node:14-alpine
RUN npm install -g http-server
WORKDIR /app
COPY ./node_modules ./node_modules
COPY package.json ./
COPY ./dist ./dist
EXPOSE 8080
CMD [ "http-server", "dist" ]