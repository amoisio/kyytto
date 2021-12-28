import * as mysql from 'mysql2/promise';
import { options } from './options.js';
import { Connection } from 'mysql2/promise';
import UnitOfWork from '../unit-of-work.js';
import ProjectRepository from './project-repository.js';
import TaskRepository from './task-repository.js';

export class MySqlUnitOfWork implements UnitOfWork {
  private readonly connection: Connection;
  public readonly projectRepository: ProjectRepository;
  public readonly taskRepository: TaskRepository;

  private constructor(connection: Connection) {
    this.connection = connection;
    this.projectRepository = new ProjectRepository(connection);
    this.taskRepository = new TaskRepository(connection);
  }

  public static async openContext(): Promise<UnitOfWork> {
    const connection = await mysql.createConnection({
      host: options.sqlHost,
      user: options.sqlUsername,
      password: options.sqlPassword,
      database: options.sqlDatabase
    });
    return new MySqlUnitOfWork(connection);
  }

  public async closeContext(): Promise<void> {
    await this.connection.end();
  }
}
