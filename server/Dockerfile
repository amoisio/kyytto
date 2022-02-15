FROM node:14-alpine
ARG CORS
ARG PORT
ARG FILENAME
WORKDIR /app
COPY ./dist ./dist
COPY ./node_modules ./node_modules
COPY package.json .
RUN mkdir ./data
VOLUME ./data
ENV CORS=${CORS}
ENV PORT=${PORT}
ENV FILENAME=${FILENAME}
EXPOSE ${PORT}
CMD ["node", "dist/server.js"]
