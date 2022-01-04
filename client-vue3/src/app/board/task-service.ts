import { Task } from './task-models';
import { LocalStorageRepository } from '@/shared/local-storage-repository';
import { LocalStorage } from '@/shared/local-storage';
import * as mappers from '@/shared/mappers';
import { ApiClient, idBuilder, Identifier, ProjectResource, TaskResource } from 'kyytto-models';
import { api } from '../api';

export interface TaskService {
  save(task: Task): Promise<Identifier>;
  create(newTask: Task): Promise<Identifier>;
  getAll(): Promise<Task[]>;
  getById(id: Identifier): Promise<Task>
  update(task: Task): Promise<Identifier>;
  delete(id: Identifier): Promise<void>;
}

export class ApiTaskService implements TaskService {
  private readonly client: ApiClient;
  
  constructor(client: ApiClient) {
    this.client = client;
  }

  public async save(task: Task): Promise<Identifier> {
    if (task.id.isNil()) {
      return await this.create(task);
    } else {
      return await this.update(task);
    }
  }

  public async create(newTask: Task): Promise<Identifier> {
    const resource = mappers.taskResourceMapper(newTask);
    const id = await this.client.postTask(resource);
    return id;
  }

  public async getAll(): Promise<Task[]> {
    const taskResources = await this.client.getTasks();
    const projectResources = await this.client.getProjects();
    
    return taskResources.map(taskResource => {
      const projectResource = projectResources.find(pr => pr.href === taskResource.projectHref);
      if (projectResource === undefined) {
        throw new Error('Project reference was missing.');
      }
      return Task.from(taskResource, projectResource);
    });
  }

  public async getById(id: Identifier): Promise<Task> {
    const taskResource = await this.client.getTask(id);
    const projectResource = await this.client.getProject(api.resolveId(taskResource.projectHref));
    return Task.from(taskResource, projectResource);
  }

  public async update(task: Task): Promise<Identifier> {
    const resource = mappers.taskResourceMapper(task);
    await this.client.putTask(resource);
    return task.id;
  }

  public async delete(id: Identifier): Promise<void> {
    await this.client.deleteTask(id);
  }
}

export class LocalStorageTaskService implements TaskService {
  private readonly taskRepository: LocalStorageRepository<TaskResource>;
  private readonly projectRepository: LocalStorageRepository<ProjectResource>;

  constructor(store: LocalStorage) {
    this.taskRepository = store.taskRepository;
    this.projectRepository = store.projectRepository;
  }

  public async save(task: Task): Promise<Identifier> {
    if (task.id.isNil()) {
      return await this.create(task);
    } else {
      return await this.update(task);
    }
  }

  public async create(newTask: Task): Promise<Identifier> {
    const resource = mappers.taskResourceMapper(newTask);
    const id = this.taskRepository.add(resource);
    return idBuilder(id);
  }

  public async getAll(): Promise<Task[]> {
    const resources = this.taskRepository.getAll();
    return resources.map(resource => this.getTask(resource));
  }

  public async getById(id: Identifier): Promise<Task> {
    const resource = this.taskRepository.getById(id.value);
    return this.getTask(resource);
  }

  private getTask(taskResource: TaskResource) : Task {
    const projectId = api.resolveId(taskResource.projectHref);
    const projectResource = this.projectRepository.getById(projectId.value);
    return Task.from(taskResource, projectResource);
  }

  public async update(task: Task): Promise<Identifier> {
    const resource = mappers.taskResourceMapper(task);
    this.taskRepository.update(resource);
    return task.id;
  }

  public async delete(id: Identifier): Promise<void> {
    this.taskRepository.remove(id.value);
  }
}
