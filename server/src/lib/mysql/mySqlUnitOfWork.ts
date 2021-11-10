import { Connection } from "mysql2/promise";
import { connectionFactory } from './connectionFactory';
import HourNoteRepository from "../../cases/hours/hourNoteRepository";
import LearningNoteRepository from "../../cases/learning/learningNoteRepository";
import TodoNoteRepository from "../../cases/todos/todoNoteRepository";
import IUnitOfWork from "../iUnitOfWork";

export default class MySqlUnitOfWork implements IUnitOfWork {

    private _connection !: Connection;
    private readonly _connectionFactory !: () => Promise<Connection>;

    public constructor(connectionFactory: () => Promise<Connection>) { 
        this._connectionFactory = connectionFactory;
    }

    public hourNoteRepository !: HourNoteRepository;
    public learningNoteRepository !: LearningNoteRepository;
    public todoNoteRepository !: TodoNoteRepository;

    public async startSession(): Promise<void> {
        this._connection = await this._connectionFactory();
        await this._connection.connect();
        this.hourNoteRepository = new HourNoteRepository(this._connection);
        this.learningNoteRepository = new LearningNoteRepository(this._connection);
        this.todoNoteRepository = new TodoNoteRepository(this._connection);
    }

    public async closeSession() : Promise<void> {
        this._connection.end();
    }
}

export const unitOfWork = () => new MySqlUnitOfWork(connectionFactory);