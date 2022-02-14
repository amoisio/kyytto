#!/bin/sh
docker run -it -d --rm --name k-server \
-v $(pwd)/data:/app/data k-server:0.0.1