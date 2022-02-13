import { AxiosInstance } from 'axios';
import { TasksApi } from '../api/tasks-api.js';
import { TaskDto } from '../models/task-dto.js';
import { TaskResource } from '../models/task-resource.js';
import { IdentifierType } from '../models/identifier.js';
import { ApiClient, BaseEndPointClient } from './api-client.js';

export class TasksApiEndPointClient extends BaseEndPointClient implements ApiClient<TaskDto, TaskResource> {
  private readonly api: TasksApi;
  constructor(ax: AxiosInstance, api: TasksApi) {
    super(ax);
    this.api = api;
  }
  public async getAll(): Promise<TaskResource[]> {
    const response = await this.ax.get<TaskResource[]>(this.api.resolve());
    return response.data;
  }
  public async create(dto: TaskDto): Promise<IdentifierType> {
    const response = await this.ax.post<IdentifierType>(this.api.resolve(), dto);
    if (response.data === undefined) {
      throw new Error('POST response did not include any data.');
    } else {
      return response.data;
    }
  }
  public async getById(id: IdentifierType): Promise<TaskResource> {
    const response = await this.ax.get<TaskResource>(this.api.byId.resolve(undefined, id));
    return response.data;
  }
  public async update(id: IdentifierType, dto: TaskDto): Promise<void> {
    await this.ax.put<void>(this.api.byId.resolve(undefined, id), dto);
  }
  public async delete(id: IdentifierType): Promise<void> {
    await this.ax.delete<void>(this.api.byId.resolve(undefined, id));
  }
}
