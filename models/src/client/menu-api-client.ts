import { AxiosInstance } from 'axios';
import { ResourceReference } from '../models/resource.js';
import { MenuResource } from '../models/menu-resource.js';
import { BaseClient } from './base-client.js';

export class MenuApiClient extends BaseClient {

  constructor(ax: AxiosInstance, path: string) { 
    super(ax, path);
  }

  public async get(): Promise<MenuResource> {
    const response = await this.ax.get<MenuResource>(this.path);
    return response.data;
  }

  public resourceHref(): ResourceReference {
    return `${this.baseUrl}${this.path}`;
  }
}
