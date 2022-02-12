class Options {
  public readonly apiServerHost: string;
  public readonly apiServerPort: number;

  constructor() {
    this.apiServerHost = process.env.VUE_APP_API_SERVER_HOST || 'http://localhost';
    this.apiServerPort = process.env.VUE_APP_API_SERVER_PORT || 8090;
  }
}

/**
 * Kyyttö options.
 */
export const options = new Options();
