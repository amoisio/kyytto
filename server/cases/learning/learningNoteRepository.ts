import { store } from '../../lib/utilities';
import { LearningDetail, LearningNote } from './learningNote';
import { v4 as uuidv4 } from 'uuid';
import IRepository from '../irepository';
import { Connection, RowDataPacket } from 'mysql2/promise';

export default class LearningNoteRepository implements IRepository<LearningNote> {

    constructor(private connection: Connection) { 

    }

    public async getAll(): Promise<LearningNote[]> {
        const cmd = this.selectTopics;
        const rowData = await this.connection.execute<RowDataPacket[]>(cmd);
        if (rowData[0].length == 0) {
            return [];
        } else {
            const results = this.constructNotes(rowData[0])
            return results;
        }
    }

    private selectTopics = `
        select l.id, l.topic, d.learn_id, d.description
        from 
            learning l inner join 
            learning_details d on l.id = d.learn_id
        order by l.topic;`;

    get(id: string): Promise<LearningNote> {
        throw new Error('Method not implemented.');
    }
    create(item: LearningNote): Promise<string> {
        throw new Error('Method not implemented.');
    }
    update(item: LearningNote): Promise<void> {
        throw new Error('Method not implemented.');
    }

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