import { AxiosInstance } from 'axios';
import { IdentifierType } from '../models/identifier.js';

export abstract class BaseApi {
  protected readonly ax: AxiosInstance;
  public readonly baseUrl: string;
  public readonly path: string;

  constructor(ax: AxiosInstance, path: string) {
    this.ax = ax;
    if (ax.defaults.baseURL === undefined) {
      throw new Error('Axios base url must be defined.')
    }
    this.baseUrl = this.prepareUrl(ax.defaults.baseURL);
    if (this.baseUrl === undefined || this.baseUrl.length === 0) {
      throw new Error('baseUrl must be given.');
    }
    this.path = this.prepareUrl(path);
    if (this.path === undefined || this.path.length === 0) {
      throw new Error('resourceUrl must be given.');
    }
  }

  public resolveHref(id?: IdentifierType): string {
    let href = `${this.baseUrl}${this.path}`;
    if (id !== undefined) {
      href = `${href}/${id}`;
    }
    return href;
  }

  private prepareUrl(url: string): string {
    const b = url.trimEnd();
    if (b === undefined || b.length === 0 || !b.endsWith('/')) {
      return b;
    } else {
      return b.substring(0, b.length - 1);
    }
  }
}
