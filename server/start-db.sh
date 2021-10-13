#!/bin/bash

SCRIPT=$(readlink -f "$0")
# Absolute path this script is in, thus /home/user/bin
SCRIPTPATH=$(dirname "$SCRIPT")
echo "Executing start-db in $SCRIPTPATH"

NAME=$1
PASSWORD=$2
# echo "Checking if container $1 exists"
# EXISTS=$(docker container ls --format "{{json .Names}}" --all | grep \"$NAME\" | wc -c | { read wc; test $wc -gt 0 && echo 1 || echo 0; })
# echo $EXISTS

docker run --rm --name "$NAME" \
    -v $SCRIPTPATH/database:/var/lib/mysql \
    -v $SCRIPTPATH/scripts:/usr/share/mysql-8.0/scripts \
    -e MYSQL_ROOT_PASSWORD=$PASSWORD \
    -e MYSQL_DATABASE=$NAME \
    -d mysql:latest

# Install init
# source /usr/share/mysql-8.0/scripts/migrations/init.sql
