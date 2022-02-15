class Options {
  private readonly apiServerScheme: string;
  private readonly apiServerHost: string;
  private readonly apiServerPort: number;
  public get apiServerBaseUrl(): string {
    const base = `${this.apiServerHost}`
    const path = (options.apiServerPort !== 80)
      ? `${base}:${options.apiServerPort}`
      : base;
    return `${this.apiServerScheme}://${path}`;
  }

  constructor() {
    this.apiServerScheme = process.env.VUE_APP_API_SERVER_SCHEME || 'http';
    this.apiServerHost = process.env.VUE_APP_API_SERVER_HOST || 'localhost';
    this.apiServerPort = process.env.VUE_APP_API_SERVER_PORT || 8090;
  }
}

/**
 * Kyyttö options.
 */
export const options = new Options();
