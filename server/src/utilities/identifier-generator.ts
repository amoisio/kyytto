import { IdentifierType, Identifier } from 'kyytto-models';

export interface IdentifierGenerator {
  generate(): IdentifierType;
}

export class UuidGenerator implements IdentifierGenerator {
  public generate(): IdentifierType {
    return Identifier.generateNew();
  }
}
