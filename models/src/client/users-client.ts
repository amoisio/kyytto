import { AxiosInstance } from 'axios';
import { UsersApi } from '../api/users-api.js';
import { UserDto } from '../models/user-dto.js';
import { UserResource } from '../models/user-resource.js';
import { IdentifierType } from '../models/identifier.js';
import { ApiClient, BaseEndPointClient } from './api-client.js';

export class UsersApiEndPointClient extends BaseEndPointClient implements ApiClient<UserDto, UserResource> {
  private readonly api: UsersApi;
  constructor(ax: AxiosInstance, api: UsersApi) {
    super(ax);
    this.api = api;
  }
  public async getAll(): Promise<UserResource[]> {
    const response = await this.ax.get<UserResource[]>(this.api.resolve());
    return response.data;
  }
  public async create(dto: UserDto): Promise<IdentifierType> {
    const response = await this.ax.post<IdentifierType>(this.api.resolve(), dto);
    if (response.data === undefined) {
      throw new Error('POST response did not include any data.');
    } else {
      return response.data;
    }
  }
  public async getById(id: IdentifierType): Promise<UserResource> {
    const response = await this.ax.get<UserResource>(this.api.byId.resolve(undefined, id));
    return response.data;
  }
  public async update(id: IdentifierType, dto: UserDto): Promise<void> {
    await this.ax.put<void>(this.api.byId.resolve(undefined, id), dto);
  }
  public async delete(id: IdentifierType): Promise<void> {
    await this.ax.delete<void>(this.api.byId.resolve(undefined, id));
  }
}
