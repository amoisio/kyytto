import { ApiClient, KyyttoClient, TagDto, TagResource } from 'kyytto-models';
import { ApiService, Service } from '../api-service';
import { Tag, TagCollection } from './tag-models';

export interface TagService extends Service<Tag, TagDto> {
  getAllUserTags(): Promise<Tag[]>;
}

export class ApiTagService extends ApiService<Tag, TagDto, TagResource> implements TagService {
  private readonly client: KyyttoClient;

  constructor(client: KyyttoClient) {
    super();
    this.client = client;
  }

  public async getAllUserTags(): Promise<Tag[]> {
    const tagResources = await this.client.tags.getAll();
    const tags = new TagCollection(tagResources)
      .filter(tag => tag.isUserDefined());
    return tags;
  }

  protected getApiClient(): ApiClient<TagDto, TagResource> {
    return this.client.tags;
  }

  protected async buildEntities(resources: TagResource[]): Promise<Tag[]> {
    return new TagCollection(resources);
  }

  protected async buildEntity(resource: TagResource): Promise<Tag> {
    return new Tag(resource);
  }
}
