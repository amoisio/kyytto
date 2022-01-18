import { TagResource } from '../models/tag-resource.js';
import { Identifier, IdentifierType } from '../models/identifier.js';
import { TagDto } from '../models/tag-dto.js';
import { AxiosInstance } from 'axios';
import { BaseApi } from './base-api.js';

export class TagsApi extends BaseApi {
  constructor(ax: AxiosInstance, path: string) {
    super(ax, path);
  }

  public async getAll(): Promise<TagResource[]> {
    const response = await this.ax.get<TagResource[]>(this.path);
    return response.data;
  }

  public async getById(id: IdentifierType): Promise<TagResource> {
    const response = await this.ax.get<TagResource>(`${this.path}/${id}`);
    return response.data;
  }

  public async create(tag: TagDto): Promise<IdentifierType> {
    const response = await this.ax.post<string>(`${this.path}`, tag);
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

  public async delete(id: IdentifierType): Promise<void> {
    await this.ax.delete<void>(`${this.path}/${id}`);
  }
}
