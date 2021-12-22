import { Connection } from 'mysql2/promise';
import { connectionFactory } from './connection-factory.js';
import UnitOfWork from '../unitOfWork.js';
import ProjectRepository from './project-repository.js';
import TaskRepository from './task-repository.js';

export class MySqlUnitOfWork implements UnitOfWork {

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
    this.taskRepository = new TaskRepository(this._connection);
  }

  public async closeSession(): Promise<void> {
    this._connection.end();
  }
}

export const builder = (): UnitOfWork => new MySqlUnitOfWork(connectionFactory);