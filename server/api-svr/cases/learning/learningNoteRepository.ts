import { Connection } from 'mysql';
import { LearningDetail, LearningNote } from './learningNote';

export default class LearningNoteRepository {
    constructor(private connection: Connection) { }

    public async getAll(): Promise<LearningNote[]> {
        return new Promise(async (resolve) => {
            const query = Promise.all<LearningNote[], LearningDetail[]>([
                this.queryTopics(),
                this.queryDetails()
            ]);
            const [topics, details] = await query;
            this.combineDetailsToTopics(topics, details);
            return resolve(topics);
        });
    }

    private queryTopics(): Promise<LearningNote[]> {
        const query = `select 
            id, 
            topic,
        from learning`;

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

    private queryDetails(): Promise<LearningDetail[]> {
        const query = `select 
            learn_id, 
            description,
        from learning_details`;

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

    private combineDetailsToTopics(topics: LearningNote[], details: LearningDetail[]): void {
        for (let topic of topics) {
            topic.details = details.filter(detail => detail.learn_id === topic.id);
        }
    }
}