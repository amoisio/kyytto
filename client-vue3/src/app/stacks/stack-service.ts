import { Stack } from './stack-models';
import { ApiClient, KClient, StackDto, StackResource, Utilities } from 'k-models';
import { ApiService } from '../api-service';

export class ApiStackService extends ApiService<Stack, StackDto, StackResource> {
  private readonly client: KClient;

  constructor(client: KClient) {
    super();
    this.client = client;
  }

  protected getApiClient(): ApiClient<StackDto, StackResource> {
    return this.client.stacks;
  }

  protected async buildEntities(resources: StackResource[]): Promise<Stack[]> {
    const tagResources = await this.client.tags.getAll();
    return resources.map(stack => {
      const tags = tagResources.filter(t => stack.tagHrefs.includes(t.href));
      return new Stack(stack, tags);
    });
  }

  protected async buildEntity(resource: StackResource): Promise<Stack> {
    const tagResources = await Promise.all(resource.tagHrefs.map(async (t) => {
      const tagId = Utilities.resolveId(t);
      return await this.client.tags.getById(tagId);
    }));
    return new Stack(resource, tagResources);
  }
}
