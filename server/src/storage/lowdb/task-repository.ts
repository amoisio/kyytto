import Repository from '../repository.js';
import { Project } from '../../resources/projects/project.js';
import { Task } from '../../resources/tasks/task.js';
import { Low } from 'lowdb'
import { DataDb, ProjectDb, TagDb, TaskDb } from './db-model.js';
import { colorBuilder, idBuilder, Identifier, TagType } from 'kyytto-models';
import { Tag } from '../../resources/tags/tag.js';

export default class TaskRepository implements Repository<Task> {
  constructor(private readonly db: Low<DataDb>) { }

  public async getAll(): Promise<Task[]> {
    return this.db.data!.tasks.map(p => this.constructTask(p));
  }

  public async getById(id: Identifier): Promise<Task> {
    const match = this.db.data!.tasks.find(p => p.id === id.value);
    if (match !== undefined) {
      return this.constructTask(match);
    } else {
      throw new Error(`No Task found for ${id}.`);
    }
  }

  public async findById(id: Identifier): Promise<Task | undefined> {
    const match = this.db.data!.tasks.find(p => p.id === id.value);
    if (match !== undefined) {
      return this.constructTask(match);
    } else {
      return undefined;
    }
  }

  private constructTask(model: TaskDb): Task {
    const projectModel = this.db.data?.projects.find(p => p.id === model.projectId);
    if (projectModel === undefined) {
      throw new Error('Bad task data. Project was undefined.');
    }
    
    const project = this.constructProject(projectModel);
    const tags = this.constructTags(model.tags);
    tags.push(project.toTag());

    return new Task(
      idBuilder(model.id),
      model.title,
      model.description,
      model.state,
      project,
      tags);
  }

  private constructProject(model: ProjectDb): Project {
    return new Project(
      idBuilder(model.id),
      model.name,
      model.description,
      colorBuilder(model.color)
    );
  }

  private constructTags(tags: TagDb[] = []): Tag[] {
    return tags.map(tag => new Tag(
      idBuilder(tag.id),
      tag.name,
      tag.type
    ));
  }

  public async add(task: Task): Promise<void> {
    const userTags = task.tags.filter(tag => tag.type === TagType.UserDefined);
    this.db.data!.tasks.push({
      id: task.id.value,
      title: task.title,
      description: task.description,
      state: task.state,
      projectId: task.project.id.value,
      tags: userTags.map(tag => ({
        id: tag.id.value,
        name: tag.name,
        type: tag.type
      }))
    });
  }

  public async update(task: Task): Promise<void> {
    const match = this.db.data!.tasks.find(p => p.id === task.id.value);
    if (match !== undefined) {
      const userTags = task.tags.filter(tag => tag.type === TagType.UserDefined);
      match.title = task.title;
      match.description = task.description;
      match.state = task.state;
      match.projectId = task.project.id.value;
      match.tags = userTags.map(tag => ({
        id: tag.id.value,
        name: tag.name,
        type: tag.type
      }));
    } else {
      throw new Error(`No Task found for ${task.id}.`);
    }
  }

  public async delete(id: Identifier): Promise<void> {
    const index = this.db.data!.tasks.findIndex(t => t.id === id.value);
    if (index !== -1) {
      this.db.data!.tasks.splice(index, 1);
    } else {
      throw new Error(`No Task found for ${id}.`);
    }
  }
}
