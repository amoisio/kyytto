import { MenuResource } from '../models/menu-resource.js';
import { ProjectResource } from '../models/project-resource.js';
import { TaskResource } from '../models/task-resource.js';
import { Api } from './api.js';
import axios, { AxiosInstance } from 'axios';

export interface ApiClient {
  getMenu(): Promise<MenuResource>;
  getProjects(): Promise<ProjectResource[]>;
  getProject(id: string): Promise<ProjectResource>;
  postProject(project: ProjectResource): Promise<string>;
  putProject(project: ProjectResource): Promise<void>;
  deleteProject(id: string): Promise<void>;
  getTasks(): Promise<TaskResource[]>;
  getTask(id: string): Promise<TaskResource>;
  postTask(task: TaskResource): Promise<string>;
  putTask(task: TaskResource): Promise<void>;
  deleteTask(id: string): Promise<void>;
}

export class KyyttoClient implements ApiClient {
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

  public async getProject(id: string): Promise<ProjectResource> {
    const response = await this.ax.get<ProjectResource>(
      `${this.api.projects.path}/${id}`);
    return response.data;
  }

  public async postProject(project: ProjectResource): Promise<string> {
    const response = await this.ax.post<string>(
      `${this.api.projects.path}`, project);
    return response.data;
  }

  public async putProject(project: ProjectResource): Promise<void> {
    const id = this.api.resolveId(project.href);
    await this.ax.put<void>(
      `${this.api.projects.path}/${id}`, project);
  }

  public async deleteProject(id: string): Promise<void> {
     await this.ax.delete<void>(
      `${this.api.projects.path}/${id}`);
  }

  public async getTasks(): Promise<TaskResource[]> {
    const response = await this.ax.get<TaskResource[]>(
      this.api.tasks.path);
    return response.data;
  }

  public async getTask(id: string): Promise<TaskResource> {
    const response = await this.ax.get<TaskResource>(
      `${this.api.tasks.path}/${id}`);
    return response.data;
  }

  public async postTask(task: TaskResource): Promise<string> {
    const response = await this.ax.post<string>(
      `${this.api.tasks.path}`, task);
    return response.data;
  }

  public async putTask(task: TaskResource): Promise<void> {
    const id = this.api.resolveId(task.href);
    await this.ax.put<void>(
      `${this.api.tasks.path}/${id}`, task);
  }

  public async deleteTask(id: string): Promise<void> {
    await this.ax.delete<void>(
      `${this.api.tasks.path}/${id}`);
  }
}