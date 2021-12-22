import Repository from '../repository.js';
import { Project } from '../../cases/projects/project.js';
import { Task } from '../../cases/tasks/task.js';
import { Low, JSONFile } from 'lowdb'
import { DataDb, ProjectDb, TaskDb } from './db-model.js';

export default class TaskRepository implements Repository<Task> {
  private readonly db: Low<DataDb>;

  constructor(filePath: string) {
    const adapter = new JSONFile<DataDb>(filePath)
    this.db = new Low<DataDb>(adapter)
  }

  public async getAll(): Promise<Task[]> {
    await this.db.read();
    if (this.db.data !== null && this.db.data.tasks !== null) {
      return this.db.data.tasks.map(p => this.constructTask(p));
    } else {
      return [];
    }
  }

  private constructTask(model: TaskDb): Task {
    const project = this.db.data?.projects.find(p => p.id === model.projectId);
    return new Task(
      model.id,
      model.title,
      model.description,
      model.state,
      this.constructProject(project!));
  }

  private constructProject(model: ProjectDb): Project {
    return new Project(
      model.id,
      model.name,
      model.description,
      model.color
    );
  }

  public async get(id: string): Promise<Task> {
    await this.db.read();
    if (this.db.data !== null && this.db.data.tasks !== null) {
      const match = this.db.data.tasks.find(p => p.id === id);
      if (match !== undefined) {
        return this.constructTask(match);
      }
    }
    throw new Error(`No Task found for ${id}.`);
  }

  public async create(task: Task): Promise<string> {
    await this.db.read();
    this.db.data ||= { projects: [], tasks: [] };
    this.db.data.tasks ||= [];
    this.db.data.tasks.push({
      id: task.id,
      title: task.title,
      description: task.description,
      state: task.state,
      projectId: task.project.id
    });
    this.db.write();
    return task.id;
  }

  public async update(task: Task): Promise<void> {
    await this.db.read();
    if (this.db.data !== null && this.db.data.tasks !== null) {
      const match = this.db.data.tasks.find(p => p.id === task.id);
      if (match !== undefined) {
        match.title = task.title;
        match.description = task.description;
        match.state = task.state;
        match.projectId = task.project.id
        this.db.write();
      }
    }
    throw new Error(`No Task found for ${task.id}.`);  }
}
