import { MenuResource } from './models/menu-resource.js';
import { ProjectResource } from './models/project-resource.js';
import { ProjectDto } from './models/project-dto.js';
import { TaskResource } from './models/task-resource.js';
import { TaskDto } from './models/task-dto.js';
import { TagResource } from './models/tag-resource.js';
import { TagDto } from './models/tag-dto.js';
import { Api } from './api.js';
import axios, { AxiosInstance } from 'axios';
import { Identifier, IdentifierType } from './models/identifier.js';

export interface ApiClient {
  // Menu
  getMenu(): Promise<MenuResource>;
  // Projects
  getProjects(): Promise<ProjectResource[]>;
  getProject(id: IdentifierType): Promise<ProjectResource>;
  postProject(project: ProjectDto): Promise<IdentifierType>;
  putProject(id: IdentifierType, project: ProjectDto): Promise<void>;
  deleteProject(id: IdentifierType): Promise<void>;

  // Tasks
  getTasks(): Promise<TaskResource[]>;
  getTask(id: IdentifierType): Promise<TaskResource>;
  postTask(task: TaskDto): Promise<IdentifierType>;
  putTask(id: IdentifierType, task: TaskDto): Promise<void>;
  deleteTask(id: IdentifierType): Promise<void>;

  // Tags
  getTags(): Promise<TagResource[]>;
  getTag(id: IdentifierType): Promise<TagResource>;
  postTag(tag: TagDto): Promise<IdentifierType>;
  deleteTag(id: IdentifierType): Promise<void>;
}

export const clientBuilder = (api: Api): ApiClient => new KyyttoClient(api);

class KyyttoClient implements ApiClient {
  private readonly ax: AxiosInstance;
  constructor(private readonly api: Api) { 
    this.ax = axios.create({
      baseURL: api.baseUrl
    });
  }

  public async getMenu(): Promise<MenuResource> {
    const response = await this.ax.get<MenuResource>(
      this.api.menu.path);
    return response.data;
  }

  public async getProjects(): Promise<ProjectResource[]> {
    const response = await this.ax.get<ProjectResource[]>(
      this.api.projects.path);
    return response.data;
  }

  public async getProject(id: IdentifierType): Promise<ProjectResource> {
    const response = await this.ax.get<ProjectResource>(
      `${this.api.projects.path}/${id}`);
    return response.data;
  }

  public async postProject(newProject: ProjectDto): Promise<IdentifierType> {
    const response = await this.ax.post<string>(
      `${this.api.projects.path}`, newProject);
    
    if (response.data === undefined) {
      throw new Error('POST response did not include any data.');
    } else {
      const id = Identifier.build(response.data);
      if (id === undefined) {
        throw new Error('POST response did not include a valid id.');
      } else {
        return id;
      }
    }
  }

  public async putProject(id: IdentifierType, project: ProjectDto): Promise<void> {
    await this.ax.put<void>(
      `${this.api.projects.path}/${id}`, project);
  }

  public async deleteProject(id: IdentifierType): Promise<void> {
     await this.ax.delete<void>(
      `${this.api.projects.path}/${id}`);
  }

  public async migrateProject(project: ProjectResource): Promise<void> {
    await this.ax.post<void>(
      `${this.api.projects.path}/migration`, project);
  }

  public async getTasks(): Promise<TaskResource[]> {
    const response = await this.ax.get<TaskResource[]>(
      this.api.tasks.path);
    return response.data;
  }

  public async getTask(id: IdentifierType): Promise<TaskResource> {
    const response = await this.ax.get<TaskResource>(
      `${this.api.tasks.path}/${id}`);
    return response.data;
  }

  public async postTask(task: TaskDto): Promise<IdentifierType> {
    const response = await this.ax.post<string>(
      `${this.api.tasks.path}`, task);
    
    if (response.data === undefined) {
      throw new Error('POST response did not include any data.');
    } else {
      const id = Identifier.build(response.data);
      if (id === undefined) {
        throw new Error('POST response did not include a valid id.');
      } else {
        return id;
      }
    }
  }

  public async putTask(id: IdentifierType, task: TaskDto): Promise<void> {
    await this.ax.put<void>(
      `${this.api.tasks.path}/${id}`, task);
  }

  public async deleteTask(id: IdentifierType): Promise<void> {
    await this.ax.delete<void>(
      `${this.api.tasks.path}/${id}`);
  }

  public async migrateTask(task: TaskResource): Promise<void> {
    await this.ax.post<void>(
      `${this.api.tasks.path}/migration`, task);
  }

  public async getTags(): Promise<TagResource[]> {
    const response = await this.ax.get<TagResource[]>(
      this.api.tags.path);
    return response.data;
  }

  public async getTag(id: IdentifierType): Promise<TagResource> {
    const response = await this.ax.get<TagResource>(
      `${this.api.tags.path}/${id}`);
    return response.data;
  }

  public async postTag(tag: TagDto): Promise<IdentifierType> {
    const response = await this.ax.post<string>(
      `${this.api.tags.path}`, tag);

    if (response.data === undefined) {
      throw new Error('POST response did not include any data.');
    } else {
      const id = Identifier.build(response.data);
      if (id === undefined) {
        throw new Error('POST response did not include a valid id.');
      } else {
        return id;
      }
    }
  }

  public async deleteTag(id: IdentifierType): Promise<void> {
    await this.ax.delete<void>(
      `${this.api.tags.path}/${id}`);
  }
}
