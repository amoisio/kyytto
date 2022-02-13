import { AxiosInstance } from 'axios';
import { StacksApi } from '../api/stacks-api.js';
import { StackDto } from '../models/stack-dto.js';
import { StackResource } from '../models/stack-resource.js';
import { IdentifierType } from '../models/identifier.js';
import { ApiClient, BaseEndPointClient } from './api-client.js';

export class StacksApiEndPointClient extends BaseEndPointClient implements ApiClient<StackDto, StackResource> {
  private readonly api: StacksApi;
  constructor(ax: AxiosInstance, api: StacksApi) {
    super(ax);
    this.api = api;
  }
  public async getAll(): Promise<StackResource[]> {
    const response = await this.ax.get<StackResource[]>(this.api.resolve());
    return response.data;
  }
  public async create(dto: StackDto): Promise<IdentifierType> {
    const response = await this.ax.post<IdentifierType>(this.api.resolve(), dto);
    if (response.data === undefined) {
      throw new Error('POST response did not include any data.');
    } else {
      return response.data;
    }
  }
  public async getById(id: IdentifierType): Promise<StackResource> {
    const response = await this.ax.get<StackResource>(this.api.byId.resolve(undefined, id));
    return response.data;
  }
  public async update(id: IdentifierType, dto: StackDto): Promise<void> {
    await this.ax.put<void>(this.api.byId.resolve(undefined, id), dto);
  }
  public async delete(id: IdentifierType): Promise<void> {
    await this.ax.delete<void>(this.api.byId.resolve(undefined, id));
  }
}
