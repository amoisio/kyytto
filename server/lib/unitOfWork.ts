import { Connection } from "mysql2/promise";
import HourNoteRepository from "../cases/hours/hourNoteRepository";

export default class UnitOfWork {

    private connection !: Connection;

    private constructor() { }

    public static async startSession(connectionFactory: () => Promise<Connection>) : Promise<UnitOfWork> {
        const uow = new UnitOfWork();
        uow.connection  = await connectionFactory();
        await uow.connection.connect();
        uow.hourNoteRepository = new HourNoteRepository(uow.connection);
        return uow;
    }

    public hourNoteRepository !: HourNoteRepository;

    public async closeSession() : Promise<void> {
        this.connection.end();
    }
}