import { Api, MenuResource, ProjectResource, TaskResource } from 'src';
import axios from 'axios';

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
  constructor(private readonly api: Api) { }

  public async getMenu(): Promise<MenuResource> {
    const response = await axios.get<MenuResource>(
      this.api.menu.path);
    return response.data;
  }

  public async getProjects(): Promise<ProjectResource[]> {
    const response = await axios.get<ProjectResource[]>(
      this.api.projects.path);
    return response.data;
  }

  public async getProject(id: string): Promise<ProjectResource> {
    const response = await axios.get<ProjectResource>(
      `${this.api.projects.path}/${id}`);
    return response.data;
  }

  public async postProject(project: ProjectResource): Promise<string> {
    const response = await axios.post<string>(
      `${this.api.projects.path}`, project);
    return response.data;
  }

  public async putProject(project: ProjectResource): Promise<void> {
    const id = this.api.resolveId(project.href);
    await axios.put<void>(
      `${this.api.projects.path}/${id}`, project);
  }

  public async deleteProject(id: string): Promise<void> {
     await axios.delete<void>(
      `${this.api.projects.path}/${id}`);
  }

  public async getTasks(): Promise<TaskResource[]> {
    const response = await axios.get<TaskResource[]>(
      this.api.tasks.path);
    return response.data;
  }

  public async getTask(id: string): Promise<TaskResource> {
    const response = await axios.get<TaskResource>(
      `${this.api.tasks.path}/${id}`);
    return response.data;
  }

  public async postTask(task: TaskResource): Promise<string> {
    const response = await axios.post<string>(
      `${this.api.tasks.path}`, task);
    return response.data;
  }

  public async putTask(task: TaskResource): Promise<void> {
    const id = this.api.resolveId(task.href);
    await axios.put<void>(
      `${this.api.tasks.path}/${id}`, task);
  }

  public async deleteTask(id: string): Promise<void> {
    await axios.delete<void>(
      `${this.api.tasks.path}/${id}`);
  }
}
