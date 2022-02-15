class Options {
  public readonly fileName: string;

  constructor() {
    this.fileName = process.env['FILENAME'] || 'k-data.json';
  }
}

export const options = new Options();
