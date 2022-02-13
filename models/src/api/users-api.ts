import { Api, ApiEndPoint } from './api.js';

export interface UsersApi extends Api {
  byId: Api;
}

export class UsersApiEndPoint extends ApiEndPoint implements UsersApi {
  constructor(path: string) {
    super(path);
    this.addChild('/:id', ApiEndPoint);
  }
  get byId(): Api {
    return this.getChild('/:id');
  }
}
