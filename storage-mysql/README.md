1. Build mysql server image - root password, user+password
2. Start the container
2.1. Point the data storage to an outside location
3. Wait for the mysql service to start up
4.  Detect if external storage already has a database with a specific name, and if it does then continue
4.1. Yes, then continue
4.2. No, then then run 0_schema.sql
4. Run migrations

2. Apply scripts to set up 