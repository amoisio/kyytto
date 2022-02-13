import { AxiosInstance } from 'axios';
import { IdentifierType } from '../models/identifier.js';
import { Utilities } from '../utilities/util.js';

export interface ApiClient<TDto, TResource> {
  create(dto: TDto): Promise <IdentifierType>;
  getAll(): Promise<TResource[]>;
  getById(id: IdentifierType): Promise<TResource>;
  update(id: IdentifierType, dto: TDto): Promise<void>;
  delete(id: IdentifierType): Promise<void>;
}

export abstract class BaseEndPointClient {
  protected readonly ax: AxiosInstance;
  public readonly baseUrl: string;

  constructor(ax: AxiosInstance) {
    this.ax = ax;
    if (Utilities.isEmpty(ax.defaults.baseURL)) {
      throw new Error('Axios base url must be defined.')
    }
    this.baseUrl = this.prepareUrl(ax.defaults.baseURL!);
    if (Utilities.isEmpty(this.baseUrl)) {
      throw new Error('baseUrl must be given.');
    }
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
