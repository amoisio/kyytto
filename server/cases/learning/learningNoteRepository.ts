import { Connection } from 'mysql';
import { store } from '../../lib/utilities';
import { LearningDetail, LearningNote } from './learningNote';
import { v4 as uuidv4 } from 'uuid';

export default class LearningNoteRepository {
    private _query: <T>(query: string) => Promise<T>;

    constructor(private connection: Connection) { 
        this._query = store(connection);
    }

    public async getAll(): Promise<LearningNote[]> {
        return new Promise(async (resolve) => {
            const query = Promise.all<LearningNote[], LearningDetail[]>([
                this._query(this.selectTopicsQuery()),
                this._query(this.selectDetailsQuery())
            ]);
            const [topics, details] = await query;
            this.combineDetailsToTopics(topics, details);
            return resolve(topics);
        });
    }

    private selectTopicsQuery = () => `
        select 
            id, 
            topic
        from learning`;

    private selectDetailsQuery = () => `
        select 
            learn_id, 
            description
        from learning_details`

    private combineDetailsToTopics(topics: LearningNote[], details: LearningDetail[]): void {
        for (let topic of topics) {
            topic.details = details.filter(detail => detail.learn_id === topic.id);
        }
    }
}