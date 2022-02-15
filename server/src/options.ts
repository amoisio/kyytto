class Options {
  public readonly connectionString: string;
  public readonly apiServerPort: number;
  public readonly cors: string;
  public readonly sqlHost: string;
  public readonly sqlUsername: string;
  public readonly sqlPassword: string;
  public readonly sqlDatabase: string;

  constructor() {
    this.connectionString = process.env['FILENAME'] || 'k-data.json';
    this.apiServerPort = Number(process.env['PORT'] || '8090');
    this.cors = process.env['CORS'] || '';
    this.sqlHost = process.env['SQL_HOST'] || '127.0.0.1';
    this.sqlUsername = process.env['SQL_USERNAME'] || 'kyytto';
    this.sqlPassword = process.env['SQL_PASSWORD'] || 'Kyytto123';
    this.sqlDatabase = process.env['SQL_DATABASE'] || 'kyytto';
  }
}

export const options = new Options();
