import { v4 as uuidv4, validate } from 'uuid';

export class Identifier extends String {

  constructor(value: string) {
    super(value);
  }

  public static new(): Identifier {
    return new Identifier(uuidv4());
  }

  public validate(): boolean {
    return validate(this.valueOf());
  }
}
