import { Connection, RowDataPacket } from 'mysql2/promise';
import IRepository from '../../lib/iRepository';
import { LearningNote } from './learningNote';

export default class LearningNoteRepository implements IRepository<LearningNote> {

    constructor(private connection: Connection) { 

    }

    public async getAll(): Promise<LearningNote[]> {
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
        select l.id, l.topic, d.learn_id, d.description
        from 
            learning l inner join 
            learning_details d on l.id = d.learn_id
        order by l.topic;`;

    public async get(id: string): Promise<LearningNote> {
        const cmd = this.selectNoteById;
        const rowData = await this.connection.execute<RowDataPacket[]>(cmd, [id]);
        if (rowData[0].length == 0) {
            throw new Error(`No LearningNote found for ${id}.`);
        } else {
            const results = this.constructNotes(rowData[0])
            return results[0];
        }
    }

    private selectNoteById = `
        select l.id, l.topic, d.learn_id, d.description
        from 
            learning l inner join 
            learning_details d on l.id = d.learn_id
        where
            l.id = ?;`;

    public async create(note: LearningNote): Promise<string> {
        await this.connection.beginTransaction();

        try {
            await this.connection.execute(
                this.insertNote, [note.id, note.topic]);

            for (let detail of note.details) {
                await this.connection.execute(
                    this.insertDetail, [detail.learn_id, detail.description]);
            }
            await this.connection.commit();
        } catch {
            await this.connection.rollback();
        }

        return note.id;
    }

    private insertNote = `
        insert into learning (id, topic)
        values (?, ?);`;

    private insertDetail = `
        insert into learning_details (learn_id, description)
        values (?, ?);`;

    public async update(note: LearningNote): Promise<void> {
        await this.connection.beginTransaction();

        try {
            await this.connection.execute(
                this.updateNote, [note.topic, note.id]);

            await this.connection.execute(
                this.deleteDetails, [note.id]);

            for (let detail of note.details) {
                await this.connection.execute(
                    this.insertDetail, [detail.learn_id, detail.description]);
            }
            await this.connection.commit();
        } catch {
            await this.connection.rollback();
        }
    }

    private updateNote = `
        update learning
        set topic = ?
        where id = ?;`;

    private deleteDetails = `
        delete from learning_details
        where learn_id = ?;`

    private constructNotes(rows: RowDataPacket[]): LearningNote[] {
        const arr: LearningNote[] = [];
        const map = new Map<string, LearningNote>();

        for (let row of rows) {
            let id = row.id;
            let note: LearningNote;
            if (map.has(id)) {
                note = map.get(id)!;
            } else {
                note = new LearningNote(id, row.topic);
                arr.push(note);
                map.set(note.id, note);
            }

            note.addDetail(row.description);
        }
        return arr;
    }
}