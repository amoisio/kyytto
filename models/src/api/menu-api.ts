import { AxiosInstance } from 'axios';
import { MenuResource } from '../models/menu-resource.js';
import { BaseApi } from './base-api.js';

export class MenuApi extends BaseApi {
  constructor(ax: AxiosInstance, path: string) { 
    super(ax, path);
  }

  public async get(): Promise<MenuResource> {
    const response = await this.ax.get<MenuResource>(this.path);
    return response.data;
  }
}
