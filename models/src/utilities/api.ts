import { Identifier } from '../models/identifier.js';
import { parse } from './hrefParser.js';

export const buildApi = (baseUrl: string): Api => {
  return new KyyttoApi(baseUrl);
}

/**
 * Kyytto API
 */
export interface Api {

  /**
   * Api base url.
   */
  baseUrl: string;

  /**
   * Menu end-point
   */
  menu: EndPoint;

  /**
   * Projects end-point.
   */
  projects: EndPoint;

  /**
   * Tasks end-point.
   */
  tasks: EndPoint;

  /**
   * Resolves the id of the given href.
   * Example,
   *  href = http://domain:port/api/resource/123
   *  returns 123
   *
   * @param href resource href.
   */
  resolveId(href: string): Identifier;
}

/**
 * A kyytto API end-point.
 */
export interface EndPoint {

  /**
   * End-point url path.
   * Example,
   *  url = http://domain:port/api/resource
   *  path = /api/resource
   */
  path: string;

  /**
   * Resolves the href for the current end-point and given id.
   * Example,
   *  baseUrl = http://domain:port 
   *  path = /api/resource
   *  id = 123  
   *  returns http://domain:port/api/resource/123
   * 
   * @param id entity id.
   */
  resolveHref(id?: string | Identifier): string;
}

class KyyttoApi implements Api {
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.menu = new KyyttoEndPoint(baseUrl, '/api/menu');
    this.projects = new KyyttoEndPoint(baseUrl, '/api/projects');
    this.tasks = new KyyttoEndPoint(baseUrl, '/api/tasks');
  }
  
  public readonly baseUrl: string;
  public readonly menu: EndPoint;
  public readonly projects: EndPoint;
  public readonly tasks: EndPoint;
  public resolveId(href: string): Identifier {
    return parse(href).id;
  }
}

class KyyttoEndPoint implements EndPoint {
  constructor(baseUrl: string, resourceUrl: string) {
    this.baseUrl = prepareUrl(baseUrl);
    if (this.baseUrl === undefined || this.baseUrl.length === 0) {
      throw new Error('baseUrl must be given.');
    }

    this.path = prepareUrl(resourceUrl);
    if (this.path === undefined || this.path.length === 0) {
      throw new Error('resourceUrl must be given.');
    }
  }

  private readonly baseUrl: string;
  public readonly path: string;
  public resolveHref(id?: string | Identifier): string {
    let href = `${this.baseUrl}${this.path}`;
    if (id !== undefined) {
      href = `${href}/${id}`;
    }
    return href;
  }
}

const prepareUrl = (url: string): string => {
  const b = url.trimEnd();
  if (b === undefined || b.length === 0 || !b.endsWith('/')) {
    return b;
  } else {
    return b.substring(0, b.length - 1);
  }
}
