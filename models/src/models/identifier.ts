import { v4 as uuidv4, validate } from 'uuid';

export class Identifier {
  private readonly value: string;
  constructor(value: string) {
    this.value = value;
  }

  public static new(): Identifier {
    return new Identifier(uuidv4());
  }

  public validate(): boolean {
    return validate(this.value);
  }
}
