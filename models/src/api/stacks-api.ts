import { Api, ApiEndPoint } from './api';

export interface StacksApi extends Api {
  byId: Api;
}

export class StacksApiEndPoint extends ApiEndPoint implements StacksApi  {
  constructor(path: string) {
    super(path);
    this.addChild('/:id', ApiEndPoint);
  }
  get byId(): Api {
    return this.getChild('/:id');
  }
}
