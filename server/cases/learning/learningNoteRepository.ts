import { Connection } from 'mysql';
import { store } from '../../lib/utilities';
import { LearningDetail, LearningNote } from './learningNote';

export default class LearningNoteRepository {
    private _query: <T>(query: string) => Promise<T>;

    constructor(private connection: Connection) { 
        this._query = store(connection);
    }

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
        const cmd = `select 
            id, 
            topic,
        from learning`;
        return this._query(cmd);
    };

    private queryDetails(): Promise<LearningDetail[]> {
        const cmd = `select 
            learn_id, 
            description,
        from learning_details`;
        return this._query(cmd);
    };

    private combineDetailsToTopics(topics: LearningNote[], details: LearningDetail[]): void {
        for (let topic of topics) {
            topic.details = details.filter(detail => detail.learn_id === topic.id);
        }
    }
}