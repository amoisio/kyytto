import { AxiosInstance } from 'axios';
import { TagDto } from '../models/tag-dto.js';
import { TagResource } from '../models/tag-resource.js';
import { IdentifierType } from '../models/identifier.js';
import { ApiClient, BaseEndPointClient } from './api-client.js';
import { TagsApi } from '../api/tags-api.js';

export class TagsApiEndPointClient extends BaseEndPointClient implements ApiClient<TagDto, TagResource> {
  private readonly api: TagsApi;
  constructor(ax: AxiosInstance, api: TagsApi) {
    super(ax);
    this.api = api;
  }
  public async getAll(): Promise<TagResource[]> {
    const response = await this.ax.get<TagResource[]>(this.api.resolve());
    return response.data;
  }
  public async create(dto: TagDto): Promise<IdentifierType> {
    const response = await this.ax.post<IdentifierType>(this.api.resolve(), dto);
    if (response.data === undefined) {
      throw new Error('POST response did not include any data.');
    } else {
      return response.data;
    }
  }
  public async getById(id: IdentifierType): Promise<TagResource> {
    const response = await this.ax.get<TagResource>(this.api.byId.resolve(undefined, id));
    return response.data;
  }
  public async update(id: IdentifierType, dto: TagDto): Promise<void> {
    await this.ax.put<void>(this.api.byId.resolve(undefined, id), dto);
  }
  public async delete(id: IdentifierType): Promise<void> {
    await this.ax.delete<void>(this.api.byId.resolve(undefined, id));
  }
}
