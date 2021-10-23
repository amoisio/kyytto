import { Connection } from 'mysql';

export const store: (connection: Connection) => <T>(query: string) => Promise<T> =
    (connection: Connection) => (query: string) => new Promise((resolve, reject) => 
    {
        connection.query(query, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });