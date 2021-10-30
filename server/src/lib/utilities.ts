import * as mysql from 'mysql2/promise';
import LinkBuilder from './linkBuilder';

export const connectionFactory = (): Promise<mysql.Connection> => mysql.createConnection({
    host: process.env['SQL_HOST'],
    user: process.env['SQL_USERNAME'],
    password: process.env['SQL_PASSWORD'],
    database: process.env['SQL_DATABASE']
});

export const getLinkBuilder = (): LinkBuilder => {
    const host = process.env['API_SERVER_HOST']!;
    const port = process.env['API_SERVER_PORT']!;
    const builder = new LinkBuilder(host, port);
    return builder;
}
