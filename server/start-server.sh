#!/bin/bash

SCRIPT=$(readlink -f "$0")
# Absolute path this script is in, thus /home/user/bin
SCRIPTPATH=$(dirname "$SCRIPT")
echo $SCRIPTPATH

docker run --rm --name kyytto-server \
-v $SCRIPTPATH/resources:/usr/share/nginx/html:ro \
-v $SCRIPTPATH/nginx.conf:/etc/nginx/nginx.conf \
-p 8080:80 nginx