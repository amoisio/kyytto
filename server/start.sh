#!/bin/bash
SCRIPT=$(readlink -f "$0")

# Absolute path this script is in, thus /home/user/bin
SCRIPTPATH=$(dirname "$SCRIPT")
echo "Executing start-db in $SCRIPTPATH"

NAME=$SQL_CONTAINER 
DBNAME=$SQL_DATABASE
PASSWORD=$SQL_PASSWORD

# Stop and run the mysql container
echo "Stopping container $NAME..."
sudo docker container stop $NAME > /dev/null
echo "Container $NAME stopped."

echo "Starting a new container $NAME..."
sudo docker run --rm --name "$NAME" \
    -v $SCRIPTPATH/database:/usr/share/mysql-8.0/scripts \
    -e MYSQL_ROOT_PASSWORD=$PASSWORD \
    -e MYSQL_DATABASE=$DBNAME \
    -d mysql:latest > /dev/null
echo "Container $NAME started."

# Wait for the mysql service to start and seed the database with the init.sql
TIMEOUT=30
echo "Waiting for $TIMEOUT seconds - give mysql service time to start"
sleep 30
echo "Seed development database with data"
sudo docker exec -it "$NAME" sh -c "mysql -p$PASSWORD $DBNAME < /usr/share/mysql-8.0/scripts/init.sql"