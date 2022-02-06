import { IdentifierType, Identifier } from 'k-models';

export interface IdentifierGenerator {
  generate(): IdentifierType;
}

export class UuidGenerator implements IdentifierGenerator {
  public generate(): IdentifierType {
    return Identifier.generateNew();
  }
}
