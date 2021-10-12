#!/bin/bash

SCRIPT=$(readlink -f "$0")
# Absolute path this script is in, thus /home/user/bin
SCRIPTPATH=$(dirname "$SCRIPT")
echo $SCRIPTPATH

docker run --rm --name kyytto-db \
-v $SCRIPTPATH/scripts:/usr/share/mysql-8.0/scripts \
-e MYSQL_ROOT_PASSWORD=Passw0rd \
-d mysql:latest
