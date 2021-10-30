import { Connection, RowDataPacket } from 'mysql2/promise';
import IRepository from '../../lib/irepository';
import { TodoNote } from './todoNote';

export default class TodoNoteRepository implements IRepository<TodoNote> {

    constructor(private connection: Connection) { 

    }

    public async getAll(): Promise<TodoNote[]> { 
        const cmd = this.selectAll;
        const rowData = await this.connection.execute<RowDataPacket[]>(cmd);
        if (rowData[0].length == 0) {
            return [];
        } else {
            const results = this.constructNotes(rowData[0])
            return results;
        }
    }
    
    private selectAll = `
        select id, description, done        
        from todos`;

    public async get(id: string): Promise<TodoNote> {
        const cmd = this.selectNoteById;
        const rowData = await this.connection.execute<RowDataPacket[]>(cmd, [id]);
        if (rowData[0].length == 0) {
            throw new Error(`No TodoNote found for ${id}.`);
        } else {
            const results = this.constructNotes(rowData[0])
            return results[0];
        }
    }

    private selectNoteById = `
        select id, description, done        
        from todos
        where id = ?;`;

    public async create(note: TodoNote): Promise<string> {
        await this.connection.execute(this.insertNote, [note.id, note.description]);
        return note.id;
    }

    private insertNote = `
        insert into todos (id, description)
        values (?, ?);`;

    public async update(note: TodoNote): Promise<void> {
        await this.connection.execute(this.updateQuery, [note.description, note.done, note.id]);
    }

    private updateQuery = `
        update todos
        set description = ?,
            done = ?
        where id = ?;`;

    private constructNotes(rows: RowDataPacket[]): TodoNote[] {
        const arr: TodoNote[] = [];
        for (let row of rows) {
            let note = new TodoNote(row.id, row.description, row.done);
            arr.push(note);
        }
        return arr;
    }
}