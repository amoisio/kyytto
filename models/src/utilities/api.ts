import { parse } from './hrefParser';

export const buildApi = (baseUrl: string): Api => {
  return new KyyttoApi(baseUrl);
}

export interface Api {
  projects: EndPoint;
  tasks: EndPoint;
  resolveId(href: string): string;
}

export interface EndPoint {
  url: string;
  resolveHref(id: string): string;
}

class KyyttoApi implements Api {
  constructor(baseUrl: string) {
    this.projects = new KyyttoEndPoint(baseUrl, '/api/projects');
    this.tasks    = new KyyttoEndPoint(baseUrl, '/api/tasks');
  }

  public projects: EndPoint;
  public tasks: EndPoint;
  public resolveId(href: string): string {
    return parse(href).id;
  }
}

class KyyttoEndPoint implements EndPoint {
  constructor (baseUrl: string, resourceUrl: string) { 
    this.baseUrl = prepareUrl(baseUrl);
    if (this.baseUrl === undefined || this.baseUrl.length === 0) {
      throw new Error('baseUrl must be given.');
    }

    this.url = prepareUrl(resourceUrl);
    if (this.url === undefined || this.url.length === 0) {
      throw new Error('resourceUrl must be given.');
    }
  }

  private baseUrl: string;
  public url: string;
  public resolveHref(id: string): string {
    return `${this.baseUrl}/${this.url}/${id}`;
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
