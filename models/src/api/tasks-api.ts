import { Identifier, IdentifierType } from '../models/identifier.js';
import { AxiosInstance } from 'axios';
import { TaskResource } from '../models/task-resource.js';
import { TaskDto } from '../models/task-dto.js';
import { BaseApi } from './base-api.js';

export class TasksApi extends BaseApi {
  constructor(ax: AxiosInstance, path: string) {
    super(ax, path);
  }

  public async getAll(): Promise<TaskResource[]> {
    const response = await this.ax.get<TaskResource[]>(this.path);
    return response.data;
  }

  public async getById(id: IdentifierType): Promise<TaskResource> {
    const response = await this.ax.get<TaskResource>(`${this.path}/${id}`);
    return response.data;
  }

  public async create(task: TaskDto): Promise<IdentifierType> {
    const response = await this.ax.post<string>(`${this.path}`, task);
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

  public async update(id: IdentifierType, task: TaskDto): Promise<void> {
    await this.ax.put<void>(`${this.path}/${id}`, task);
  }

  public async delete(id: IdentifierType): Promise<void> {
    await this.ax.delete<void>(`${this.path}/${id}`);
  }

  public async migrate(task: TaskResource): Promise<void> {
    await this.ax.post<void>(`${this.path}/migration`, task);
  }
}
