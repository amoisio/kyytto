import axios from 'axios';
import { BaseApi } from './base-api.js';
import { MenuApi } from './menu-api.js';
import { ProjectsApi } from './projects-api.js';
import { TagsApi } from './tags-api.js';
import { TasksApi } from './tasks-api.js';

export class Api extends BaseApi {
    constructor(baseUrl: string) {
    const ax = axios.create({ baseURL: baseUrl });
    super(ax, '/');
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
}
