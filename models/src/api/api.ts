import { Utilities } from '../utilities/util';
import { ResourceReference } from '../models/resource';

export interface Api {
  path: string;
  resolve(baseUrl?: string, ...params: string[]): ResourceReference;
}

export class ApiEndPoint implements Api {
  public readonly path: string;
  private get isRoot(): boolean {
    return this.path === '/';
  }
  private readonly children: Map<string, Api>;

  constructor(path: string) {
    let t = path.trim();
    if (t.length === 0) {
      throw Error('Path must be given.');
    }
    if (t !== '/') {
      t = ApiEndPoint.prepend(t, '/');
      t = ApiEndPoint.stripEnd(t, '/');
    }
    this.path = path;
    this.children = new Map<string, Api>();
  }

  /**
   * Resolve the path by filling in placeholders with provided parameters.
   * - Placeholders are path parts which begin with ':'.
   * - Placeholders are replaced in order.
   * @param params path parameters
   * @returns A resolved api path.
   */
  public resolve(baseUrl?: string, ...params: string[]): ResourceReference {
    const parameterCount = params.length ?? 0;
    const placeholderCount = this.placeholderCount();
    if (parameterCount !== placeholderCount) {
      throw new Error(`Expected ${placeholderCount} parameters. Received ${parameterCount}.`);
    }
    
    const pathFragments = this.path.split('/');
    for (let i = pathFragments.length - 1; i > 0; i--) {
      if (pathFragments[i].startsWith(':')) {
        pathFragments[i] = params.pop() ?? '';
      }
    }
    const resolvedPath = pathFragments.join('/');
    if (Utilities.isEmpty(baseUrl)) {
      return resolvedPath;
    } else {
      return `${ApiEndPoint.stripEnd(baseUrl!, '/')}${resolvedPath}`;
    }
  }

  private placeholderCount(): number {
    const pathFragments = this.path.split('/');
    const placeholders = pathFragments.filter(f => f.startsWith(':'));
    return placeholders.length;
  }

  private static prepend(path: string, delim: string): string {
    if (!path.startsWith(delim)) {
      path = `${delim}${path}`;
    }
    return path;
  }

  private static stripEnd(path: string, delim: string): string {
    if (path.endsWith(delim)) {
      path = path.substring(0, path.length - delim.length);
    }
    return path;
  }

  protected addChild<TApi extends Api>(path: string, c: new(path: string) => TApi) {
    const fullPath = this.isRoot 
      ? path
      : `${this.path}${path}`;
    const api = new c(fullPath);
    this.children.set(path, api);
  }
  
  protected getChild<TApi extends Api>(path: string): TApi {
    const api = this.children.get(path);
    if (api === undefined) {
      throw new Error(`path ${path} not found.`);
    } else {
      return api as TApi;
    }
  }
}
