import { v4 as uuidv4, validate } from 'uuid';

export class Identifier {
  private readonly id: string;

  constructor(value: string) {
    this.id = value;
  }

  public static new(): Identifier {
    return new Identifier(uuidv4());
  }

  public validate(): boolean {
    return validate(this.id);
  }

  public toString(): string {
    return this.id;
  }
}
