
class Options {
  public readonly apiServerPort: number;

  constructor() {
    this.apiServerPort = Number(process.env['PORT'] || '8090');
  }
}

/**
 * Kyyttö back-end server application options.
 */
export const options = new Options();
