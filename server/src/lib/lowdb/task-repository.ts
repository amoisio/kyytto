import Repository from '../../repository.js';
import { Project } from '../../cases/projects/project.js';
import { Task } from '../../cases/tasks/task.js';
import { Low } from 'lowdb'
import { DataDb, ProjectDb, TaskDb } from './db-model.js';

export default class TaskRepository implements Repository<Task> {
  constructor(private readonly db: Low<DataDb>) { }

  public async getAll(): Promise<Task[]> {
    return this.db.data!.tasks.map(p => this.constructTask(p));
  }

  public async get(id: string): Promise<Task> {
    const match = this.db.data!.tasks.find(p => p.id === id);
    if (match !== undefined) {
      return this.constructTask(match);
    } else {
      throw new Error(`No Task found for ${id}.`);
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

  public async create(task: Task): Promise<string> {
    this.db.data!.tasks.push({
      id: task.id,
      title: task.title,
      description: task.description,
      state: task.state,
      projectId: task.project.id
    });
    return task.id;
  }

  public async update(task: Task): Promise<void> {
    const match = this.db.data!.tasks.find(p => p.id === task.id);
    if (match !== undefined) {
      match.title = task.title;
      match.description = task.description;
      match.state = task.state;
      match.projectId = task.project.id
    } else {
      throw new Error(`No Task found for ${task.id}.`);
    }
  }

  public async delete(id: string): Promise<void> {
    const index = this.db.data!.tasks.findIndex(t => t.id === id);
    if (index !== -1) {
      this.db.data!.tasks.splice(index, 1);
    } else {
      throw new Error(`No Task found for ${id}.`);
    }
  }
}
