
class Options {
  public readonly apiServerHost: string;
  public readonly apiServerPort: number;

  constructor() {
    this.apiServerHost = process.env['API_SERVER_HOST'] || 'http://localhost';
    this.apiServerPort = Number(process.env['API_SERVER_PORT'] || '80');
  }
}

/**
 * Kyyttö options.
 */
export const options = new Options();
