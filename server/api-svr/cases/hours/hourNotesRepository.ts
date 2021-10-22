import { Connection } from 'mysql';
import { HourDetail, HourNote } from './hourNote';

export const getHourNotes = (connection: Connection) => {
    return new Promise(async (resolve) => {
        const query = Promise.all<HourNote[], HourDetail[]>([
            queryHours(connection), 
            queryDetails(connection)
        ]);
        const [topics, details] = await query;
        const notes = buildNotes(topics, details);
        resolve(notes);
    });
};

const queryHours = (connection: Connection): Promise<HourNote[]> => {
    const query = `select 
        id, 
        date,
    from hours`;

    return new Promise((resolve, reject) => {
        connection.query(query, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

const queryDetails = (connection: Connection): Promise<HourDetail[]> => {
    const query = `select 
        hour_id, 
        description,
        estimate
    from hour_details`;

    return new Promise((resolve, reject) => {
        connection.query(query, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

const buildNotes = (hours: HourNote[], details: HourDetail[]) => {
    for (let hour of hours) {
        hour.details = details.filter(detail => detail.hour_id === hour.id);
    }
}