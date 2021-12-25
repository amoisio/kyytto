
class Options {
  public readonly sqlHost: string;
  public readonly sqlUsername: string;
  public readonly sqlPassword: string;
  public readonly sqlDatabase: string;

  constructor() {
    this.sqlHost = process.env['SQL_HOST'] || '127.0.0.1';
    this.sqlUsername = process.env['SQL_USERNAME'] || 'kyytto';
    this.sqlPassword = process.env['SQL_PASSWORD'] || 'Kyytto123';
    this.sqlDatabase = process.env['SQL_DATABASE'] || 'kyytto';
  }
}

export const options = new Options();
