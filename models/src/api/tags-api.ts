import { Api, ApiEndPoint } from './api';

export interface TagsApi extends Api {
  byId: Api;
}

export class TagsApiEndPoint extends ApiEndPoint implements TagsApi {
  constructor(path: string) {
    super(path);
    this.addChild('/:id', ApiEndPoint);
  }
  get byId(): Api {
    return this.getChild('/:id');
  }
}
