import { ApiClient, KyyttoClient, TagDto, TagResource, Utilities } from 'kyytto-models';
import { ApiService, Service } from '../api-service';
import { Tag, TagCollection } from './tag-models';

export interface TagService extends Service<Tag, TagDto> {
  getAllUserTags(): Promise<Tag[]>;
  getUserTagsAndUsages(): Promise<[tag: Tag, count: number][]> 
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

  public async getUserTagsAndUsages(): Promise<[tag: Tag, count: number][]> {
    const tags = await this.getAllUserTags();
    const taskResources = await this.client.tasks.getAll();
    const usages = new Map<string, [tag: Tag | undefined, count: number]>();
    for(let task of taskResources) {
      for (let tagHref of task.tagHrefs) {
        let id = Utilities.resolveId(tagHref);
        let count = usages.has(id)
          ? usages.get(id)![1]
          : 0;
        usages.set(id, [undefined, ++count]);
      }
    }
    for(let tag of tags) {
      let count = 0;
      if (usages.has(tag.id)) {
        count = usages.get(tag.id)![1]
      } 
      usages.set(tag.id, [tag, count]);
    }
    const results: [tag: Tag, count: number][] = [];
    for(let usage of usages.values()) {
      if (usage[0] !== undefined) {
        results.push([usage[0], usage[1]]);
      }
    }
    return results;
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
