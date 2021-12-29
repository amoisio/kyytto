import * as data from '../../appsettings.json';

class Options {
  public readonly apiServerHost: string;
  public readonly apiServerPort: number;

  constructor() {
    this.apiServerHost = data?.apiServerHost || 'http://localhost';
    this.apiServerPort = data?.apiServerPort || 80;
  }
}

/**
 * Kyyttö options.
 */
export const options = new Options();
