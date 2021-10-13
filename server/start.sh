#!/bin/bash
SCRIPT=$(readlink -f "$0")

# Absolute path this script is in, thus /home/user/bin
SCRIPTPATH=$(dirname "$SCRIPT")
echo "Executing start-db in $SCRIPTPATH"

NAME=$1
PASSWORD=$2

docker container stop $NAME

docker run --rm --name "$NAME" \
    -v $SCRIPTPATH/database:/usr/share/mysql-8.0/scripts \
    -e MYSQL_ROOT_PASSWORD=$PASSWORD \
    -e MYSQL_DATABASE=$NAME \
    -d mysql:latest

docker exec -it kyytto sh -c "/usr/share/mysql-8.0/scripts/test.sh"
# docker exec -it "$NAME" mysql -p

# docker exec -it "$NAME" sh -c "mysql -p < /usr/share/mysql-8.0/scripts/init.sql"
# echo $STATUS
# docker exec -it "$NAME" systemctl status mysql

# Install init
# source /usr/share/mysql-8.0/scripts/migrations/init.sql
