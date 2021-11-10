#!/bin/bash

#
# Rebuilds the MySql container, sets up the database schema and populates it with
# some initial fake data.
#

# Load environment variables from .envrc
echo ""
echo "/// Loading environment variables"
echo "/////////////////////////////////////////////"
eval "$(direnv hook bash)" 
direnv allow .
_direnv_hook

# Stop and remove the container running mysql
echo ""
echo "/// Stop and remove container $SQL_CONTAINER"
echo "/////////////////////////////////////////////"
docker container rm -f $SQL_CONTAINER 2> /dev/null

# Rebuild the container image
echo ""
echo "/// Rebuild container image $SQL_CONTAINER"
echo "/////////////////////////////////////////////"
docker build -t $SQL_CONTAINER .

# Start the container
echo ""
echo "/// Starting container $SQL_CONTAINER"
echo "/////////////////////////////////////////////"
docker run --rm --name $SQL_CONTAINER \
    -e MYSQL_ROOT_PASSWORD=$SQL_ROOT_PASSWORD \
    -e MYSQL_USER=$SQL_DEFAULT_USERNAME \
    -e MYSQL_PASSWORD=$SQL_DEFAULT_PASSWORD \
    -e MYSQL_DATABASE=$SQL_DATABASE \
    -d $SQL_CONTAINER 

# Waiting for mysql service to start
echo ""
echo "/// Waiting for $INIT_TIMEOUT seconds - give mysql service time to start"
echo "/////////////////////////////////////////////"
sleep $INIT_TIMEOUT

echo ""
echo "/// Seed development database with data"
echo "/////////////////////////////////////////////"
sudo docker exec -it $SQL_CONTAINER sh -c "mysql -p$SQL_PASSWORD $SQL_DATABASE < 0_schema.sql"
sudo docker exec -it $SQL_CONTAINER sh -c "mysql -p$SQL_PASSWORD $SQL_DATABASE < 1_init.sql"
