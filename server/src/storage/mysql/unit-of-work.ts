import * as mysql from 'mysql2/promise';
import { options } from './options.js';
import { Connection } from 'mysql2/promise';
import UnitOfWork from 'storage/unit-of-work.js';
import ProjectRepository from './project-repository.js';
import TaskRepository from './task-repository.js';

export class MySqlUnitOfWork implements UnitOfWork {

  public static create(): UnitOfWork {
    return new MySqlUnitOfWork(connectionFactory);
  }

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

const connectionFactory = (): Promise<mysql.Connection> => mysql.createConnection({
  host: options.sqlHost,
  user: options.sqlUsername,
  password: options.sqlPassword,
  database: options.sqlDatabase
});
