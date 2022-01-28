import { api } from '../api.js';
import { Identifiable, Identifier, IdentifierType, UserDto, UserResource } from 'kyytto-models';
import { IdentifierGenerator } from '../../utilities/identifier-generator.js';
import { isEmpty } from '../../utilities/checks.js';
import { Stack } from '../stacks/stack.js';
import UnitOfWork from '../../storage/unit-of-work.js';

export class UserBuilder {
  constructor(
    private readonly idGenerator: IdentifierGenerator,
    private readonly unitOfWork: UnitOfWork) { }

  /**
   * Creates a new user.
   * @param dto user data.
   * @returns A newly created user with generated id.
   */
  public async new(dto: UserDto): Promise<User> {
    if (isEmpty(dto.name)) {
      throw new Error('Name must be provided.');
    }

    const id = this.idGenerator.generate();
    const stack = dto.stackId 
      ? await this.unitOfWork.stackRepository.getById(dto.stackId)
      : undefined;

    return new User(id, dto.name, stack);
  }

  /**
   * Create a user entity.
   * @param id user identifier.
   * @param dto user data.
   * @returns A user entity.
   */
  public async from(id: IdentifierType, dto: UserDto): Promise<User> {
    if (!Identifier.isValid(id)) {
      throw new Error(`Id value ${id} is invalid.`);
    }

    const stack = dto.stackId
      ? await this.unitOfWork.stackRepository.getById(dto.stackId)
      : undefined;

    return new User(id, dto.name, stack);
  }
}

export class User implements Identifiable {
  public readonly id: IdentifierType;
  public readonly name: string;
  public readonly stack?: Stack;

  public constructor(id: IdentifierType, name: string, stack?: Stack) {
    if (!Identifier.isValid(id)) {
      throw new Error(`Given id: ${id} is invalid.`);
    }
    this.id = id;

    if (isEmpty(name)) {
      throw new Error('Name must not be empty.');
    }
    this.name = name;
    this.stack = stack;
  }

  public toResource(): UserResource {
    return {
      href: api.users.resolveHref(this.id),
      name: this.name,
      stackHref: this.stack ? api.stacks.resolveHref(this.stack.id) : undefined
    };
  }
}
