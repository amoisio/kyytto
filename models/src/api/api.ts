import axios from 'axios';
import { Identifier, IdentifierType } from '../models/identifier.js';
import { MenuApi } from './menu-api.js';
import { ProjectsApi } from './projects-api.js';
import { TagsApi } from './tags-api.js';
import { TasksApi } from './tasks-api.js';

export class Api {
    constructor(baseUrl: string) {
    const ax = axios.create({ baseURL: baseUrl });
    this.baseUrl = baseUrl;
    this.menu = new MenuApi(ax, '/api/menu');
    this.projects = new ProjectsApi(ax, '/api/projects');
    this.tasks = new TasksApi(ax, '/api/tasks');
    this.tags = new TagsApi(ax, '/api/tags');
  }
 
  public readonly baseUrl: string;
  public readonly menu: MenuApi;
  public readonly projects: ProjectsApi;
  public readonly tasks: TasksApi;
  public readonly tags: TagsApi;

  /**
   * Resolves the id of the given href.
   * Example,
   *  href = http://domain:port/api/resource/123
   *  returns 123
   *
   * @param href resource href.
   */
  public resolveId(href: string): IdentifierType | undefined {
    return Identifier.parse(href);
  }
}
