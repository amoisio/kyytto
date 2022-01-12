import { MenuResource } from './models/menu-resource.js';
import { ProjectResource } from './models/project-resource.js';
import { TaskResource } from './models/task-resource.js';
import { Api } from './api.js';
import axios, { AxiosInstance } from 'axios';
import { idBuilder, Identifier } from './models/identifier.js';
import { TagResource } from './models/tag-resource.js';

export interface ApiClient {
  getMenu(): Promise<MenuResource>;
  getProjects(): Promise<ProjectResource[]>;
  getProject(id: Identifier): Promise<ProjectResource>;
  postProject(project: ProjectResource): Promise<Identifier>;
  putProject(project: ProjectResource): Promise<void>;
  deleteProject(id: Identifier): Promise<void>;
  migrateProject(project: ProjectResource): Promise<void>;
  getTasks(): Promise<TaskResource[]>;
  getTask(id: Identifier): Promise<TaskResource>;
  postTask(task: TaskResource): Promise<Identifier>;
  putTask(task: TaskResource): Promise<void>;
  deleteTask(id: Identifier): Promise<void>;
  migrateTask(task: TaskResource): Promise<void>;
  getTags(): Promise<TagResource[]>;
  postTag(tag: TagResource): Promise<Identifier>;
  deleteTag(id: Identifier): Promise<void>;
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

  public async getProject(id: Identifier): Promise<ProjectResource> {
    const response = await this.ax.get<ProjectResource>(
      `${this.api.projects.path}/${id.value}`);
    return response.data;
  }

  public async postProject(project: ProjectResource): Promise<Identifier> {
    const response = await this.ax.post<string>(
      `${this.api.projects.path}`, project);
    return idBuilder(response.data);
  }

  public async putProject(project: ProjectResource): Promise<void> {
    const id = this.api.resolveId(project.href);
    await this.ax.put<void>(
      `${this.api.projects.path}/${id.value}`, project);
  }

  public async deleteProject(id: Identifier): Promise<void> {
     await this.ax.delete<void>(
      `${this.api.projects.path}/${id.value}`);
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

  public async getTask(id: Identifier): Promise<TaskResource> {
    const response = await this.ax.get<TaskResource>(
      `${this.api.tasks.path}/${id.value}`);
    return response.data;
  }

  public async postTask(task: TaskResource): Promise<Identifier> {
    const response = await this.ax.post<string>(
      `${this.api.tasks.path}`, task);
    return idBuilder(response.data);
  }

  public async putTask(task: TaskResource): Promise<void> {
    const id = this.api.resolveId(task.href);
    await this.ax.put<void>(
      `${this.api.tasks.path}/${id.value}`, task);
  }

  public async deleteTask(id: Identifier): Promise<void> {
    await this.ax.delete<void>(
      `${this.api.tasks.path}/${id.value}`);
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

  public async postTag(tag: TagResource): Promise<Identifier> {
    const response = await this.ax.post<string>(
      `${this.api.tags.path}`, tag);
    return idBuilder(response.data);
  }

  public async deleteTag(id: Identifier): Promise<void> {
    await this.ax.delete<void>(
      `${this.api.tags.path}/${id.value}`);
  }
}
