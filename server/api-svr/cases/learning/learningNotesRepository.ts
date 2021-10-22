import { Connection } from 'mysql';
import { LearningDetail, LearningNote } from './learningNote';

export const getLearningNotes = (connection: Connection) => {
    return new Promise(async (resolve) => {
        const query = Promise.all<LearningNote[], LearningDetail[]>([
            queryTopics(connection),
            queryDetails(connection)
        ]);
        const [topics, details] = await query;
        const notes = buildNotes(topics, details);
        resolve(notes);
    });
};

const queryTopics = (connection: Connection): Promise<LearningNote[]> => {
    const query = `select 
        id, 
        topic,
    from learning`;

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

const queryDetails = (connection: Connection): Promise<LearningDetail[]> => {
    const query = `select 
        learn_id, 
        description,
    from learning_details`;

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

const buildNotes = (topics: LearningNote[], details: LearningDetail[]) => {
    for (let topic of topics) {
        topic.details = details.filter(detail => detail.learn_id === topic.id);
    }
}