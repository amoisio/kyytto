import { join } from 'path';
import UnitOfWork from '../unit-of-work.js';
import ProjectRepository from './project-repository.js';
import TaskRepository from './task-repository.js';
import { Low, JSONFile } from 'lowdb'
import { DataDb } from './db-model.js';
import { options } from './options.js';
import TagRepository from './tag-repository.js';
import StackRepository from './stack-repository.js';

export class LowDbUnitOfWork implements UnitOfWork {
  private readonly db: Low<DataDb>;
  public readonly projectRepository: ProjectRepository;
  public readonly taskRepository: TaskRepository;
  public readonly tagRepository: TagRepository;
  public readonly stackRepository: StackRepository;

  private constructor(db: Low<DataDb>) { 
    this.db = db;
    this.projectRepository = new ProjectRepository(db);
    this.taskRepository = new TaskRepository(db);
    this.tagRepository = new TagRepository(db);
    this.stackRepository = new StackRepository(db);
  }

  public static async openContext(): Promise<UnitOfWork> {
    const __dirname = process.cwd();
    const __dataFolder = 'data';
    const filePath = join(__dirname, __dataFolder, options.fileName);
    const adapter = new JSONFile<DataDb>(filePath);
    const db = new Low<DataDb>(adapter);
    await db.read();
    this.initDb(db);
    return new LowDbUnitOfWork(db);
  }

  private static initDb(db: Low<DataDb>): void {
    db.data ||= {
      projects: [],
      tasks: [],
      tags: [],
      stacks: []
    };
    db.data.projects ||= [];
    db.data.tasks ||= [];
    db.data.tags ||= [];
    db.data.stacks ||= [];
  }
  
  public async closeContext(): Promise<void> { 
    await this.db.write();
  }
}
