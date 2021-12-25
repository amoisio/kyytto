import { join } from 'path';
import UnitOfWork from '../../unit-of-work.js';
import ProjectRepository from './project-repository.js';
import TaskRepository from './task-repository.js';
import { Low, JSONFile } from 'lowdb'
import { DataDb } from './db-model.js';
import { options } from './options.js';

export class LowDbUnitOfWork implements UnitOfWork {

  public static create(): UnitOfWork {
    return new LowDbUnitOfWork(options.fileName);
  }

  constructor(private readonly fileName: string) { }

  public projectRepository !: ProjectRepository;
  public taskRepository !: TaskRepository;

  private db ?: Low<DataDb>;
  public async startSession(): Promise<void> {
    const __dirname = process.cwd();
    const __dataFolder = 'data';
    const filePath = join(__dirname, __dataFolder, this.fileName);
    const adapter = new JSONFile<DataDb>(filePath);

    const db = new Low<DataDb>(adapter);
    await db.read();
    db.data ||= {
      projects: [],
      tasks: []
    };
    db.data.projects ||= [];
    db.data.tasks ||= [];
    this.db = db;

    this.projectRepository = new ProjectRepository(db);
    this.taskRepository = new TaskRepository(db);
  }

  public async closeSession(): Promise<void> { 
    if (this.db !== undefined) {
      await this.db.write();
    }
  }
}
