import axios from 'axios';
import { StackDto } from '../models/stack-dto.js';
import { StackResource } from '../models/stack-resource.js';
import { ProjectDto } from '../models/project-dto.js';
import { ProjectResource } from '../models/project-resource.js';
import { TagDto } from '../models/tag-dto.js';
import { TagResource } from '../models/tag-resource.js';
import { TaskDto } from '../models/task-dto.js';
import { TaskResource } from '../models/task-resource.js';
import { MenuApiClient, MenuApiEndPointClient } from './menu-client.js';
import { UserDto } from '../models/user-dto.js';
import { UserResource } from '../models/user-resource.js';
import { api } from '../api/k-api.js';
import { ApiClient } from './api-client.js';
import { ProjectsApiEndPointClient } from './projects-client.js';
import { StacksApiEndPointClient } from './stacks-client.js';
import { TagsApiEndPointClient } from './tags-client.js';
import { TasksApiEndPointClient } from './tasks-client.js';
import { UsersApiEndPointClient } from './users-client.js';

export class KClient {
  public readonly baseUrl: string;
  public readonly menu: MenuApiClient;
  public readonly projects: ApiClient<ProjectDto, ProjectResource>;
  public readonly stacks: ApiClient<StackDto, StackResource>;
  public readonly tags: ApiClient<TagDto, TagResource>;
  public readonly tasks: ApiClient<TaskDto, TaskResource>;
  public readonly users: ApiClient<UserDto, UserResource>;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    const ax = axios.create({ baseURL: baseUrl });
    this.menu = new MenuApiEndPointClient(ax, api.menu);
    this.projects = new ProjectsApiEndPointClient(ax, api.projects);
    this.stacks = new StacksApiEndPointClient(ax, api.stacks);
    this.tags = new TagsApiEndPointClient(ax, api.tags);
    this.tasks = new TasksApiEndPointClient(ax, api.tasks);
    this.users = new UsersApiEndPointClient(ax, api.users);
  }
}
