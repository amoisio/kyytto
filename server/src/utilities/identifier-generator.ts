import { Identifier, newId } from 'kyytto-models';

export interface IdentifierGenerator {
  generate(): Identifier;
}

export class UuidGenerator implements IdentifierGenerator {
  public generate(): Identifier {
    return newId();
  }
}
