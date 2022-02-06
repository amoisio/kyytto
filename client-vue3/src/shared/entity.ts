import { IdentifierType } from 'k-models';
import { Identifiable } from './identifiable';
import { Validatable } from './validatable';

export abstract class Entity<TDto> implements Identifiable, Validatable {
  public readonly id: IdentifierType;
  constructor(id: IdentifierType) {
    this.id = id;
  }

  public abstract toDto(): TDto;

  public isValid(): boolean {
    return this.validate().length === 0;
  }
  
  public abstract validate(): string[];
}
