FROM mysql
ARG ROOT_PASSWORD
ARG DATABASE=kyytto
ARG USER=kyytto
ARG PASSWORD=Kyytto123

ENV MYSQL_ROOT_PASSWORD=${ROOT_PASSWORD}  \
    MYSQL_DATABASE=${DATABASE} \
    MYSQL_USER=${USER} \
    MYSQL_PASSWORD=${PASSWORD} 

ADD /database/* /app/
# echo "ALTER USER '$USERNAME' IDENTIFIED WITH mysql_native_password BY '$PASSWORD';" > $SCRIPTPATH/database/user.sql

# echo "Starting a new container $NAME..."
# sudo docker run --rm --name "$NAME" \
#     -v $SCRIPTPATH/database:/usr/share/mysql-8.0/scripts \
#     -e MYSQL_ROOT_PASSWORD=$PASSWORD \
#     -e MYSQL_DATABASE=$DBNAME \
#     -d mysql:latest > /dev/null
# echo "Container $NAME started."

# # Wait for the mysql service to start and seed the database with the init.sql
# TIMEOUT=30
# echo "Waiting for $TIMEOUT seconds - give mysql service time to start"
# sleep 30
# echo "Seed development database with data"
# sudo docker exec -it "$NAME" sh -c "mysql -p$PASSWORD $DBNAME < /usr/share/mysql-8.0/scripts/user.sql"
# sudo docker exec -it "$NAME" sh -c "mysql -p$PASSWORD $DBNAME < /usr/share/mysql-8.0/scripts/schema.sql"
# sudo docker exec -it "$NAME" sh -c "mysql -p$PASSWORD $DBNAME < /usr/share/mysql-8.0/scripts/init.sql"

# echo "Finalizing start up"
# rm -f $SCRIPTPATH/database/user.sql