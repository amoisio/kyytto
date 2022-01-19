import { IdentifierType } from '../models/identifier.js';
import { ResourceReference } from '../models/resource.js';

export class Api  {
  public readonly baseUrl: string;
  public readonly menu: ApiPath;
  public readonly projects: ApiPath;
  public readonly tasks: ApiPath;
  public readonly tags: ApiPath;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.menu = new ApiPath(baseUrl, '/api/menu');
    this.projects = new ApiPath(baseUrl, '/api/projects');
    this.tasks = new ApiPath(baseUrl, '/api/tasks');
    this.tags = new ApiPath(baseUrl, '/api/tags');
  }
}

class ApiPath {
  private readonly baseUrl: string;
  public readonly path: string;

  constructor(baseUrl: string, path: string) {
    this.baseUrl = baseUrl;
    this.path = path;
  }

  public resolveHref(id: IdentifierType): ResourceReference {
    return `${this.resourceHref()}/${id}`;
  }

  public resourceHref(): ResourceReference {
    return `${this.baseUrl}${this.path}`;
  }
}