#!/bin/sh
docker run --rm -it -d --name k-server \
-v $(pwd)/data:/app/data k-server:1.0.0