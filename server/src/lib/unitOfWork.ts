import { Connection } from "mysql2/promise";
import HourNoteRepository from "../cases/hours/hourNoteRepository";
import LearningNoteRepository from "../cases/learning/learningNoteRepository";
import TodoNoteRepository from "../cases/todos/todoNoteRepository";

export default class UnitOfWork {

    private connection !: Connection;

    private constructor() { }

    public static async startSession(connectionFactory: () => Promise<Connection>) : Promise<UnitOfWork> {
        const uow = new UnitOfWork();
        uow.connection  = await connectionFactory();
        await uow.connection.connect();
        uow.hourNoteRepository = new HourNoteRepository(uow.connection);
        uow.learningNoteRepository = new LearningNoteRepository(uow.connection);
        uow.todoNoteRepository = new TodoNoteRepository(uow.connection);
        return uow;
    }

    public hourNoteRepository !: HourNoteRepository;
    public learningNoteRepository !: LearningNoteRepository;
    public todoNoteRepository !: TodoNoteRepository;

    public async closeSession() : Promise<void> {
        this.connection.end();
    }
}