import { v4 as uuidv4, validate } from 'uuid';

export interface Identifier {
  value: string;
  validate(): boolean;
}

export const idBuilder = (value: string): Identifier => {
  return new UuidIdentifier(value);
}

export const newId = (): Identifier => new UuidIdentifier(uuidv4());

class UuidIdentifier implements Identifier {
  public readonly value: string;

  constructor(value: string) {
    this.value = value;
  }

  public validate(): boolean {
    return validate(this.value);
  }
}
