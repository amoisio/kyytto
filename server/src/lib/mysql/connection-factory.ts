import * as mysql from 'mysql2/promise';
import { options } from './options.js';

export const connectionFactory = (): Promise<mysql.Connection> => mysql.createConnection({
    host: options.sqlHost,
    user: options.sqlUsername,
    password: options.sqlPassword,
    database: options.sqlDatabase
});