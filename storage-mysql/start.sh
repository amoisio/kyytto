#!/bin/bash

#
# Rebuilds and starts the MySql container. Data files are read and 
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
docker build -t $SQL_CONTAINER .

# Start the container
echo ""
echo "/// Starting container $SQL_CONTAINER"
echo "/////////////////////////////////////////////"
docker run --rm --name $SQL_CONTAINER \
    -v $SCRIPTPATH/data/$SQL_INSTANCE:/var/lib/mysql \
    -d $SQL_CONTAINER