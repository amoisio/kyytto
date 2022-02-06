import { KClient } from 'k-models';

export class AuthenticationService {
  private readonly client: KClient;
  
  constructor(client: KClient) {
    this.client = client;
  }

  public async login(username: string, password: string): Promise<string> {
    return '2d0000fe-35d1-46f9-b181-8e786df8df1f';
  }
}