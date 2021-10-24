import { Connection } from 'mysql';
import { HourDetail, HourNote } from './hourNote';
import { store } from '../../lib/utilities';
export default class HourNoteRepository {
    private _query: <T>(query: string) => Promise<T>;

    constructor(private connection: Connection) { 
        this._query = store(connection);
    }

    public async getAll(): Promise<HourNote[]> {
        return new Promise(async (resolve) => {
            const query = Promise.all<HourNote[], HourDetail[]>([
                this.queryHours(),
                this.queryDetails()
            ]);
            const [hours, details] = await query;
            this.combineDetailsToHours(hours, details);
            return resolve(hours);
        });
    }

    private queryHours(): Promise<HourNote[]> {
        const cmd = `select 
            id, 
            date
        from hours`;
        return this._query(cmd);
    };

    private queryDetails(): Promise<HourDetail[]> {
        const cmd = `select 
            hour_id, 
            description,
            estimate
        from hour_details`;
        return this._query(cmd);
    };

    private combineDetailsToHours(hours: HourNote[], details: HourDetail[]): void {
        for (let hour of hours) {
            hour.details = details.filter(detail => detail.hour_id === hour.id);
        }
    }
}