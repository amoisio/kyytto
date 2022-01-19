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

  constructor(baseUrl: string) {
    const ax = axios.create({ baseURL: baseUrl });
    this.baseUrl = baseUrl;
    this.menu = new MenuApiClient(ax, Api.menu);
    this.projects = new ApiClient(ax, Api.projects);
    this.tasks = new ApiClient(ax, Api.tasks);
    this.tags = new ApiClient(ax, Api.tags);
  }
}