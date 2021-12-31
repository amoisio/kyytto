import { v4 as uuidv4, validate } from 'uuid';

export interface Identifier {
  value: string;
  validate(): boolean;
}

export const idBuilder = (value?: string): Identifier => {
  if (value === undefined) {
    return new UuidIdentifier(uuidv4());
  } else {
    return new UuidIdentifier(value);
  }
}

class UuidIdentifier implements Identifier {
  public readonly value: string;

  constructor(value: string) {
    this.value = value;
  }

  public validate(): boolean {
    return validate(this.value);
  }
}
