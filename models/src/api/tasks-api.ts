import { Api, ApiEndPoint } from './api.js';

export interface TasksApi extends Api {
  byId: Api;
}

export class TasksApiEndPoint extends ApiEndPoint implements TasksApi {
  constructor(path: string) {
    super(path);
    this.addChild('/:id', ApiEndPoint);
  }
  get byId(): Api {
    return this.getChild('/:id');
  }
}
