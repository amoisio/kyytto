import { Connection } from 'mysql';
import { TodoNote } from '../persistence/todoNote';

export const getTodoNotes = (connection: Connection): Promise<TodoNote[]> => {
    const query = `select 
        id, 
        description, 
        done        
    from todos`;

    return new Promise((resolve, reject) => {
        connection.query(query, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};
