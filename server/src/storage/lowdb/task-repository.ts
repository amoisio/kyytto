import Repository from '../repository.js';
import { Project } from '../../resources/projects/project.js';
import { Task } from '../../resources/tasks/task.js';
import { Low } from 'lowdb'
import { DataDb, ProjectDb, TaskDb } from './db-model.js';
import { Identifier } from '../../utilities/identifier-generator.js';
import { Color } from '../../utilities/color-generator.js';

export default class TaskRepository implements Repository<Task> {
  constructor(private readonly db: Low<DataDb>) { }

  public async getAll(): Promise<Task[]> {
    return this.db.data!.tasks.map(p => this.constructTask(p));
  }

  public async getById(id: Identifier): Promise<Task> {
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
      new Identifier(model.id),
      model.title,
      model.description,
      model.state,
      this.constructProject(project!));
  }

  private constructProject(model: ProjectDb): Project {
    return new Project(
      new Identifier(model.id),
      model.name,
      model.description,
      new Color(model.color, true)
    );
  }

  public async add(task: Task): Promise<void> {
    this.db.data!.tasks.push({
      id: task.id.valueOf(),
      title: task.title,
      description: task.description,
      state: task.state,
      projectId: task.project.id.valueOf()
    });
  }

  public async update(task: Task): Promise<void> {
    const match = this.db.data!.tasks.find(p => p.id === task.id);
    if (match !== undefined) {
      match.title = task.title;
      match.description = task.description;
      match.state = task.state;
      match.projectId = task.project.id.valueOf()
    } else {
      throw new Error(`No Task found for ${task.id}.`);
    }
  }

  public async delete(id: Identifier): Promise<void> {
    const index = this.db.data!.tasks.findIndex(t => t.id === id);
    if (index !== -1) {
      this.db.data!.tasks.splice(index, 1);
    } else {
      throw new Error(`No Task found for ${id}.`);
    }
  }
}