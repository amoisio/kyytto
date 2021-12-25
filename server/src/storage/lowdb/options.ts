
class Options {
  public readonly fileName: string;

  constructor() {
    this.fileName = process.env['LOWDB_FILENAME'] || 'kyytto-lowdb.json';
  }
}

export const options = new Options();
