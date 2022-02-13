import { AxiosInstance } from 'axios';
import { MenuResource } from '../models/menu-resource.js';
import { BaseEndPointClient } from './api-client.js';
import { Api } from '../api/api.js';

export interface MenuApiClient {
  get(): Promise<MenuResource>;
}

export class MenuApiEndPointClient extends BaseEndPointClient implements MenuApiClient {
  private readonly api: Api;

  constructor(ax: AxiosInstance, api: Api) { 
    super(ax);
    this.api = api;
  }

  public async get(): Promise<MenuResource> {
    const response = await this.ax.get<MenuResource>(this.api.resolve());
    return response.data;
  }
}
