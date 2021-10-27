import { Connection, RowDataPacket } from 'mysql2/promise';
import IRepository from '../irepository';
import { HourDetail, HourNote } from './hourNote';
export default class HourNoteRepository implements IRepository<HourNote>{

    constructor(private connection: Connection) {

    }


    public async getAll(): Promise<HourNote[]> {
        const cmd = this.selectHours;
        const rowData = await this.connection.execute<RowDataPacket[]>(cmd);
        if (rowData[0].length == 0) {
            return [];
        } else {
            const results = this.constructHours(rowData[0])
            return results;
        }
    }

    private selectHours = `
        select h.id, h.date, d.hour_id, d.description, d.estimate
        from 
            hours h inner join 
            hour_details d on h.id = d.hour_id
        order by h.date desc;`;


    public async get(id: string): Promise<HourNote> {
        const cmd = this.selectHoursById;
        const rowData = await this.connection.execute<RowDataPacket[]>(cmd, [id]);
        if (rowData[0].length == 0) {
            throw new Error(`No HourNote found for ${id}.`);
        } else {
            const results = this.constructHours(rowData[0])
            return results[0];
        }
    }

    private selectHoursById = `
        select h.id, h.date, d.hour_id, d.description, d.estimate
        from 
            hours h inner join 
            hour_details d on h.id = d.hour_id
        where
            h.id = ?
        order by h.date desc;`;

    public async create(item: HourNote): Promise<string> {
        await this.connection.beginTransaction();

        try {
            await this.connection.execute(
                this.insertHour, [item.id, item.date]);

            for (let detail of item.details) {
                await this.connection.execute(
                    this.insertDetail, [detail.hour_id, detail.description, detail.estimate]);
            }
            await this.connection.commit();
        } catch {
            await this.connection.rollback();
        }

        return item.id;
    }

    private insertHour = `
        insert into hours (id, date)
        values (?, ?);`;

    private insertDetail = `
        insert into hour_details (hour_id, description, estimate)
        values (?, ?, ?);`;

    public async update(item: HourNote): Promise<void> {
        await this.connection.beginTransaction();

        try {
            await this.connection.execute(
                this.updateHour, [item.date, item.id]);

            await this.connection.execute(
                this.deleteDetails, [item.id]);

            for (let detail of item.details) {
                await this.connection.execute(
                    this.insertDetail, [detail.hour_id, detail.description, detail.estimate]);
            }
            await this.connection.commit();
        } catch {
            await this.connection.rollback();
        }
    }

    private updateHour = `
        update hours 
        set date = ?
        where id = ?;`;

    private deleteDetails = `
        delete from hour_details
        where hour_id = ?;`

    private constructHours(rows: RowDataPacket[]): HourNote[] {
        const arr: HourNote[] = [];
        const map = new Map<string, HourNote>();

        for (let row of rows) {
            let id = row.id;
            let note: HourNote;
            if (map.has(id)) {
                note = map.get(id)!;
            } else {
                note = new HourNote(id, row.date);
                arr.push(note);
                map.set(note.id, note);
            }

            note.addDetail(row.description, row.estimate);
        }
        return arr;
    }
}