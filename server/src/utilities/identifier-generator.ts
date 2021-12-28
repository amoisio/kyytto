import { validate, v4 as uuidv4 } from 'uuid';

export class Identifier extends String {
  constructor(value: string) {
    if (validate(value)) {
      super(value);
    } else {
      throw new Error(`${value} is not a valid UUID.`);
    }
  }
}

export interface IdentifierGenerator {
  generate(): Identifier;
}

export class UuidGenerator implements IdentifierGenerator {
  public generate(): Identifier {
    return new Identifier(uuidv4());
  }
}
