import { Api, ApiEndPoint } from './api.js';
import { ProjectsApi, ProjectsApiEndPoint } from './projects-api.js';
import { StacksApi, StacksApiEndPoint } from './stacks-api.js';
import { TagsApi, TagsApiEndPoint } from './tags-api.js';
import { TasksApi, TasksApiEndPoint } from './tasks-api.js';
import { UsersApi, UsersApiEndPoint } from './users-api.js';

export interface KApi extends Api {
  menu: Api;
  projects: ProjectsApi;
  stacks: StacksApi;
  tags: TagsApi;
  tasks: TasksApi;
  users: UsersApi;
}

export class KApiEndPoint extends ApiEndPoint implements KApi {
  constructor() {
    super('/');
    this.addChild('/api/menu', ApiEndPoint);
    this.addChild('/api/projects', ProjectsApiEndPoint);
    this.addChild('/api/stacks', StacksApiEndPoint);
    this.addChild('/api/tags', TagsApiEndPoint);
    this.addChild('/api/tasks', TasksApiEndPoint);
    this.addChild('/api/users', UsersApiEndPoint);
  }
  get menu(): Api {
    return this.getChild('/api/menu');
  }
  get projects(): ProjectsApi {
    return this.getChild('/api/projects');
  }
  get stacks(): StacksApi {
    return this.getChild('/api/stacks');
  }
  get tags(): TagsApi {
    return this.getChild('/api/tags');
  }
  get tasks(): TasksApi {
    return this.getChild('/api/tasks');
  }
  get users(): UsersApi {
    return this.getChild('/api/users');
  }
}

export const api: KApi = new KApiEndPoint();
