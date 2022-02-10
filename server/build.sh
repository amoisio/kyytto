#!/bin/sh
docker build -t k-server:1.0.0 \
--build-arg CORS="http://localhost:8080" \
--build-arg API_HOST="http://172.17.0.2" \
--build-arg API_PORT="8090" \
--build-arg FILENAME="kyytto-test.json" .