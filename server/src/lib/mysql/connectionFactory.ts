import * as mysql from 'mysql2/promise';

export const connectionFactory = (): Promise<mysql.Connection> => mysql.createConnection({
    host: process.env['SQL_HOST'],
    user: process.env['SQL_USERNAME'],
    password: process.env['SQL_PASSWORD'],
    database: process.env['SQL_DATABASE']
});