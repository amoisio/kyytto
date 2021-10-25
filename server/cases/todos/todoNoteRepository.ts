import { Connection } from 'mysql';
import { store } from '../../lib/utilities';
import { TodoNote } from './todoNote';
import { v4 as uuidv4 } from 'uuid';

export default class TodoNoteRepository {
    private _query: <T>(query: string) => Promise<T>;

    constructor(private connection: Connection) { 
        this._query = store(connection);
    }

    public async getAll(): Promise<TodoNote[]> { 
        const cmd = this.selectQuery();
        return await this._query(cmd);
    }
    
    private selectQuery = () => `
        select 
            id, description, done        
        from todos`;

    public async get(id: string): Promise<TodoNote> {
        const cmd = this.selectOneQuery(id);
        const results = await this._query(cmd) as any[];
        return results.length > 0
            ? results[0]
            : undefined;
    }

    private selectOneQuery = (id: string) => `
        select 
            id, description, done        
        from todos
        where id = '${id}'`;

    public async create(description: string): Promise<string> {
        const note = new TodoNote();
        note.id = uuidv4();
        note.description = description;
        const cmd = this.insertQuery(note);
        await this._query(cmd);
        return note.id;
    }

    private insertQuery = (note: TodoNote) => `
        insert into 
        todos (id, description, done)
        values ('${note.id}', '${note.description}', 0);`;

    public async update(note: TodoNote): Promise<void> {
        const cmd = this.updateQuery(note);
        return this._query(cmd);        
    }

    private updateQuery = (note: TodoNote) => `
        update todos
        set description = '${note.description}',
            done = ${note.done}
        where id = '${note.id}';`;
}