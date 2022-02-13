import { Api, ApiEndPoint } from './api.js';

export interface ProjectsApi extends Api {
  byId: Api;
}

export class ProjectsApiEndPoint extends ApiEndPoint implements ProjectsApi {
  constructor(path: string) {
    super(path);
    this.addChild('/:id', ApiEndPoint);
  }
  get byId(): Api {
    return this.getChild('/:id');
  }
}
