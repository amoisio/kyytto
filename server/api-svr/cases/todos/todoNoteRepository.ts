import { Connection } from 'mysql';
import { TodoNote } from './todoNote';

export default class TodoNoteRepository {
    constructor(private connection: Connection) { }

    public async getAll(): Promise<TodoNote[]> { 
        return await this.queryTodos();
    }

    private queryTodos(): Promise<TodoNote[]> {
        const query = `select 
            id, 
            description, 
            done        
        from todos`;

        return new Promise((resolve, reject) => {
            this.connection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    };
}