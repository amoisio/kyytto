import { Connection } from 'mysql';
import { HourDetail, HourNote } from './hourNote';

export default class HourNoteRepository {
    constructor(private connection: Connection) { }

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
        const query = `select 
            id, 
            date,
        from hours`;

        return new Promise((resolve, reject) => {
            this.connection.query(query, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    };

    private queryDetails(): Promise<HourDetail[]> {
        const query = `select 
            hour_id, 
            description,
            estimate
        from hour_details`;

        return new Promise((resolve, reject) => {
            this.connection.query(query, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    };

    private combineDetailsToHours(hours: HourNote[], details: HourDetail[]): void {
        for (let hour of hours) {
            hour.details = details.filter(detail => detail.hour_id === hour.id);
        }

    }
}