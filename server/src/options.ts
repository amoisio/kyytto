
class Options {
  public readonly apiServerHost: string;
  public readonly apiServerPort: number;
  public readonly corsAllowOrigin ?: string;

  constructor() {
    this.apiServerHost = process.env['API_SERVER_HOST'] || 'http://localhost';
    this.apiServerPort = Number(process.env['API_SERVER_PORT'] || '80');
    this.corsAllowOrigin = process.env['CORS_ALLOW_ORIGIN'];
  }
}

export const options = new Options();
