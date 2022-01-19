import axios from 'axios';
import { Api } from '../api/api.js';
import { ProjectDto } from '../models/project-dto.js';
import { ProjectResource } from '../models/project-resource.js';
import { TagDto } from '../models/tag-dto.js';
import { TagResource } from '../models/tag-resource.js';
import { TaskDto } from '../models/task-dto.js';
import { TaskResource } from '../models/task-resource.js';
import { ApiClient } from './base-client.js';
import { MenuApiClient } from './menu-api-client.js';

export class KyyttoClient {
  public readonly baseUrl: string;
  public readonly menu: MenuApiClient;
  public readonly projects: ApiClient<ProjectDto, ProjectResource>;
  public readonly tasks: ApiClient<TaskDto, TaskResource>;
  public readonly tags: ApiClient<TagDto, TagResource>;

  constructor(api: Api) {
    this.baseUrl = api.baseUrl;
    const ax = axios.create({ baseURL: api.baseUrl });
    this.menu = new MenuApiClient(ax, api.menu.path);
    this.projects = new ApiClient(ax, api.projects.path);
    this.tasks = new ApiClient(ax, api.tasks.path);
    this.tags = new ApiClient(ax, api.tags.path);
  }
}