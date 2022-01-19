import { AxiosInstance } from 'axios';
import { ResourceReference } from '../models/resource.js';
import { IdentifierType } from '../models/identifier.js';
import { Utilities } from '../utilities/util.js';

export interface Client<TDto, TResource> {
  create(dto: TDto): Promise <IdentifierType>;
  getAll(): Promise<TResource[]>;
  getById(id: IdentifierType): Promise <TResource>;
  update(id: IdentifierType, dto: TDto): Promise<void>;
  delete(id: IdentifierType): Promise<void>;
}

export abstract class BaseClient {
  protected readonly ax: AxiosInstance;
  public readonly baseUrl: string;
  public readonly path: string;

  constructor(ax: AxiosInstance, path: string) {
    this.ax = ax;
    if (Utilities.isEmpty(ax.defaults.baseURL)) {
      throw new Error('Axios base url must be defined.')
    }
    this.baseUrl = this.prepareUrl(ax.defaults.baseURL!);
    if (Utilities.isEmpty(this.baseUrl)) {
      throw new Error('baseUrl must be given.');
    }
    if (Utilities.isEmpty(path)) {
      throw new Error('path must be given.');
    }
    this.path = this.prepareUrl(path);
  }

  private prepareUrl(url: string): string {
    const b = url.trim();
    if (b === undefined || b.length === 0 || !b.endsWith('/')) {
      return b;
    } else {
      return b.substring(0, b.length - 1);
    }
  }
}

export class ApiClient<TDto, TResource> extends BaseClient implements Client<TDto, TResource> {
  constructor(ax: AxiosInstance, path: string) {
    super(ax, path);
  }
  
  public async getAll(): Promise<TResource[]> {
    const response = await this.ax.get<TResource[]>(this.path);
    return response.data;
  }

  public async getById(id: IdentifierType): Promise<TResource> {
    const response = await this.ax.get<TResource>(`${this.path}/${id}`);
    return response.data;
  }

  public async create(dto: TDto): Promise<IdentifierType> {
    const response = await this.ax.post<IdentifierType>(`${this.path}`, dto);
    if (response.data === undefined) {
      throw new Error('POST response did not include any data.');
    } else {
      return response.data;
    }
  }

  public async update(id: IdentifierType, dto: TDto): Promise<void> {
    await this.ax.put<void>(`${this.path}/${id}`, dto);
  }

  public async delete(id: IdentifierType): Promise<void> {
    await this.ax.delete<void>(`${this.path}/${id}`);
  }
}
