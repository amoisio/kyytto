import { Entity } from '@/shared/entity';
import { Identifier, IdentifierType, UserDto, Utilities } from 'k-models';
import { Stack } from '../stacks/stack-models';

export class User extends Entity<UserDto> {
  public name: string;
  public stack?: Stack;

  constructor(id: IdentifierType, name: string, stack?: Stack){
    super(id);
    this.name = name;
    this.stack = stack;
  }

  public copy(): User {
    const stack = this.stack?.copy();
    return new User(this.id, this.name, stack);
  }

  public toDto(): UserDto {
    return {
      name: this.name,
      stackId: this.stack?.id
    };
  }

  public validate(): string[] {
    const errors: string[] = [];

    if (!Identifier.isValid(this.id)) {
      errors.push(`Id ${this.id} is invalid.`);
    }

    if (Utilities.isEmpty(this.name)) {
      errors.push('Name must not be empty.');
    }

    if (this.stack) {
      const stackErrors = this.stack.validate();
      if (stackErrors.length > 0) {
        errors.push(...stackErrors);  
      }
    }

    return errors;
  }
}
