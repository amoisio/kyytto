import { client } from './api';
import { NotificationService } from '../shared/notification-service';
import { ApiStackService } from './stacks/stack-service';
import { Service } from './api-service';
import { Stack } from './stacks/stack-models';
import { StackDto, UserDto } from 'kyytto-models';
import { User } from './users/user-models';
import { ApiUserService } from './users/user-service';
import { AuthenticationService } from './login/authentication-service';

export interface AuthenticationProvider {
  user?: User;
  login(username: string, password: string): Promise<void>;
  isAuthenticated(): boolean;
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $authentication: AuthenticationProvider;
  }
}

export class KyyttoAuthenticationProvider implements AuthenticationProvider {
  private readonly authenticationService: AuthenticationService;
  private readonly stackService: Service<Stack, StackDto>;
  private readonly userService: Service<User, UserDto>
  private readonly notificationService: NotificationService;
  public user?: User;

  constructor() {
    this.authenticationService = new AuthenticationService(client);
    this.stackService = new ApiStackService(client);
    this.userService = new ApiUserService(client, this.stackService);
    this.notificationService = new NotificationService();
  }

  public async login(username: string, password: string): Promise<void> {
    const id = await this.authenticationService.login(username, password);
    this.user = await this.userService.getById(id);
  }

  public isAuthenticated(): boolean {
    return this.user !== undefined;
  }
}

export const provider: AuthenticationProvider = new KyyttoAuthenticationProvider();
