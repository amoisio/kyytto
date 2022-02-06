import Repository from '../repository.js';
import { Project } from '../../resources/projects/project.js';
import { Task } from '../../resources/tasks/task.js';
import { Low } from 'lowdb'
import { DataDb, ProjectDb, TagDb, TaskDb } from './db-model.js';
import { Color, Identifier, IdentifierType, TagType } from 'k-models';
import { Tag } from '../../resources/tags/tag.js';

export default class TaskRepository implements Repository<Task> {
  constructor(private readonly db: Low<DataDb>) { }

  public async getAll(): Promise<Task[]> {
    return this.db.data!.tasks.map(p => this.constructTask(p));
  }

  public async getById(id: IdentifierType): Promise<Task> {
    const match = this.db.data!.tasks.find(p => p.id === id);
    if (match !== undefined) {
      return this.constructTask(match);
    } else {
      throw new Error(`No Task found for ${id}.`);
    }
  }

  public async findById(id: IdentifierType): Promise<Task | undefined> {
    const match = this.db.data!.tasks.find(p => p.id === id);
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
      Identifier.build(model.id),
      model.title,
      model.description,
      model.state,
      project,
      tags,
      model.isBug);
  }

  private constructProject(model: ProjectDb): Project {
    return new Project(
      Identifier.build(model.id),
      model.name,
      model.description,
      Color.build(model.color)
    );
  }

  private constructTags(tags: TagDb[] = []): Tag[] {
    return tags.map(tag => new Tag(
      Identifier.build(tag.id),
      tag.name,
      tag.type
    ));
  }

  public async add(task: Task): Promise<void> {
    const userTags = task.tags.filter(tag => tag.type === TagType.UserDefined);
    this.db.data!.tasks.push({
      id: task.id,
      title: task.title,
      description: task.description,
      state: task.state,
      projectId: task.project.id,
      tags: userTags.map(tag => ({
        id: tag.id,
        name: tag.name,
        type: tag.type
      })),
      isBug: task.isBug
    });
  }

  public async update(task: Task): Promise<void> {
    const match = this.db.data!.tasks.find(p => p.id === task.id);
    if (match !== undefined) {
      const userTags = task.tags.filter(tag => tag.type === TagType.UserDefined);
      match.title = task.title;
      match.description = task.description;
      match.state = task.state;
      match.projectId = task.project.id;
      match.tags = userTags.map(tag => ({
        id: tag.id,
        name: tag.name,
        type: tag.type
      }));
      match.isBug = task.isBug;
    } else {
      throw new Error(`No Task found for ${task.id}.`);
    }
  }

  public async delete(id: IdentifierType): Promise<void> {
    const index = this.db.data!.tasks.findIndex(t => t.id === id);
    if (index !== -1) {
      this.db.data!.tasks.splice(index, 1);
    } else {
      throw new Error(`No Task found for ${id}.`);
    }
  }
}
