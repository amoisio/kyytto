import { KClient, StackDto, UserDto, UserResource, Utilities } from 'k-models';
import { ApiClient } from 'k-models/dist/client/base-client';
import { ApiService, Service } from '../api-service';
import { User } from './user-models';
import { Stack } from '../stacks/stack-models';

export class ApiUserService extends ApiService<User, UserDto, UserResource> {
  private readonly client: KClient;
  private readonly stackService: Service<Stack, StackDto>;

  constructor(client: KClient, stackService: Service<Stack, StackDto>) {
    super();
    this.client = client;
    this.stackService = stackService;
  }

  protected getApiClient(): ApiClient<UserDto, UserResource> {
    return this.client.users;
  }

  protected async buildEntities(resources: UserResource[]): Promise<User[]> {
    return await Promise.all(resources.map(r => this.buildEntity(r)));
  }

  protected async buildEntity(resource: UserResource): Promise<User> {
    let stack = undefined;
    if (resource.stackHref !== undefined) {
      const stackId = Utilities.resolveId(resource.stackHref);
      stack = await this.stackService.getById(stackId);
    }
    const id = Utilities.resolveId(resource.href);
    return new User(id, resource.name, stack);
  }
}
