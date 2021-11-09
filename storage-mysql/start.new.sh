#!/bin/bash

#
# Rebuilds the MySql container and sets up the database schema. Data files are
# persisted under /data.
#

SCRIPT=$(readlink -f "$0")
SCRIPTPATH=$(dirname "$SCRIPT")
echo ""
echo "/// Executing start-db in $SCRIPTPATH"
echo "/////////////////////////////////////////////"

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
docker build -t $SQL_CONTAINER --build-arg ROOT_PASSWORD=$SQL_PASSWORD .

# Start the container
echo ""
echo "/// Starting container $SQL_CONTAINER"
echo "/////////////////////////////////////////////"
docker run --rm --name $SQL_CONTAINER \
    -v $SCRIPTPATH/data/$SQL_INSTANCE:/var/lib/mysql \
    -e MYSQL_ROOT_PASSWORD=$SQL_PASSWORD \
    -e MYSQL_DATABASE=$SQL_DATABASE \
    -d $SQL_CONTAINER 

# Waiting for mysql service to start
echo ""
echo "/// Waiting for $INIT_TIMEOUT seconds - give mysql service time to start"
echo "/////////////////////////////////////////////"
sleep $INIT_TIMEOUT

echo ""
echo "/// Setup database schema"
echo "/////////////////////////////////////////////"
sudo docker exec -it $SQL_CONTAINER sh -c "mysql -p$SQL_PASSWORD $SQL_DATABASE < 0_schema.sql"