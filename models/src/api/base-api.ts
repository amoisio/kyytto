import { AxiosInstance } from 'axios';
import { ResourceReference } from '../models/resource.js';
import { Identifier, IdentifierType } from '../models/identifier.js';
import { Utilities } from '../utilities/util.js';

export abstract class BaseApi {
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

  public resolveHref(id?: IdentifierType): string {
    let href = `${this.baseUrl}${this.path}`;
    if (id !== undefined) {
      href = `${href}/${id}`;
    }
    return href;
  }

  private prepareUrl(url: string): string {
    const b = url.trim();
    if (b === undefined || b.length === 0 || !b.endsWith('/')) {
      return b;
    } else {
      return b.substring(0, b.length - 1);
    }
  }

  /**
   * Resolves the id of the given href.
   * Example,
   *  href = http://domain:port/api/resource/123
   *  returns 123
   *
   * @param href resource href.
   */
  public resolveId(href: ResourceReference): IdentifierType | undefined {
    return Identifier.parse(href);
  }
}
