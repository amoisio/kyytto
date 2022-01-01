import { IProject, Project } from '@/app/projects/project-models';
import { ITask, Task } from './task-models';
import { LocalStorageRepository } from '@/shared/local-storage-repository';
import { LocalStorage } from '@/shared/local-storage';
import * as mappers from '@/shared/mappers';
import { ApiClient, idBuilder, Identifier, ProjectResource, TaskResource } from 'kyytto-models';
import { api } from '../api';

export interface TaskService {
  create(newTask: ITask): Promise<Identifier>;
  getAll(): Promise<ITask[]>;
  getById(id: Identifier): Promise<ITask>
  update(task: ITask): Promise<void>;
  delete(id: Identifier): Promise<void>;
}

export class ApiTaskService implements TaskService {
  private readonly client: ApiClient;
  constructor(client: ApiClient) {
    this.client = client;
  }

  public async create(newTask: ITask): Promise<Identifier> {
    const resource = mappers.taskResourceMapper(newTask);
    const id = await this.client.postTask(resource);
    return id;
  }

  public async getAll(): Promise<ITask[]> {
    const taskResources = await this.client.getTasks();
    const projectResources = await this.client.getProjects();
    
    return taskResources.map(tr => {
      const projectResource = projectResources.find(pr => pr.href === tr.projectHref);
      if (projectResource === undefined) {
        throw new Error('Project reference was missing.');
      }
      return this.getTask(tr, projectResource);
    });
  }

  private getTask(taskResource: TaskResource, projectResource: ProjectResource): ITask {
    const project = Project.createFrom(projectResource);
    return Task.createFrom(taskResource, project);
  }

  public async getById(id: Identifier): Promise<ITask> {
    const taskResource = await this.client.getTask(id);
    const projectResource = await this.client.getProject(api.resolveId(taskResource.projectHref));
    return this.getTask(taskResource, projectResource);
  }

  public async update(task: ITask): Promise<void> {
    const resource = mappers.taskResourceMapper(task);
    await this.client.putTask(resource);
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

  public async create(newTask: ITask): Promise<Identifier> {
    const item = mappers.taskResourceMapper(newTask);
    const id = this.taskRepository.add(item);
    return idBuilder(id);
  }

  public async getAll(): Promise<ITask[]> {
    const items = this.taskRepository.getAll();
    return items.map(item => this.getTask(item));
  }

  public async getById(id: Identifier): Promise<ITask> {
    const item = this.taskRepository.getById(id.value);
    return this.getTask(item);
  }

  private getTask(taskItem: TaskResource) : ITask {
    const projectId = api.resolveId(taskItem.projectHref);
    const projectItem = this.projectRepository.getById(projectId.value);
    const project = Project.createFrom(projectItem);
    return Task.createFrom(taskItem, project);
  }

  public async update(task: ITask): Promise<void> {
    const item = mappers.taskResourceMapper(task);
    this.taskRepository.update(item);
  }

  public async delete(id: Identifier): Promise<void> {
    this.taskRepository.remove(id.value);
  }
}
