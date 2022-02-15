FROM node:14-alpine
ARG PORT=8090
ARG FILENAME=k-data.json
WORKDIR /app
COPY ./dist ./dist
COPY ./node_modules ./node_modules
COPY package.json .
RUN mkdir ./data
VOLUME ./data
ENV PORT=${PORT}
ENV FILENAME=${FILENAME}
EXPOSE ${PORT}
CMD ["node", "dist/server.js"]
