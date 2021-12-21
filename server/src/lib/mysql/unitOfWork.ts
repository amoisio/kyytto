import { Connection } from "mysql2/promise";
import { connectionFactory } from './connectionFactory';
import IUnitOfWork from "../iUnitOfWork";
import ProjectRepository from "../../cases/projects/repository";
import TaskRepository from "../../cases/tasks/repository";

export default class UnitOfWork implements IUnitOfWork {

    private _connection !: Connection;
    private readonly _connectionFactory !: () => Promise<Connection>;

    public constructor(connectionFactory: () => Promise<Connection>) { 
        this._connectionFactory = connectionFactory;
    }

    public projectRepository !: ProjectRepository;
    public taskRepository !: TaskRepository;
    
    public async startSession(): Promise<void> {
        this._connection = await this._connectionFactory();
        await this._connection.connect();
        this.projectRepository = new ProjectRepository(this._connection);
    }

    public async closeSession() : Promise<void> {
        this._connection.end();
    }
}

export const unitOfWork = () => new UnitOfWork(connectionFactory);