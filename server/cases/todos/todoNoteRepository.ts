import { Connection } from 'mysql';
import { store } from '../../lib/utilities';
import { TodoNote } from './todoNote';

export default class TodoNoteRepository {
    private _query: <T>(query: string) => Promise<T>;

    constructor(private connection: Connection) { 
        this._query = store(connection);
    }

    public async getAll(): Promise<TodoNote[]> { 
        return await this.queryTodos();
    }

    private queryTodos(): Promise<TodoNote[]> {
        const cmd = `select 
            id, 
            description, 
            done        
        from todos`;
        return this._query(cmd);
    };
}