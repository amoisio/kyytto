import { Entity } from '@/shared/entity';
import { Identifier, IdentifierType, TagDto, TagResource, TagType, Utilities } from 'kyytto-models';

export class TagCollection extends Array<Tag> {
  constructor(resources: TagResource[]) {
    super(...resources.map(r => new Tag(r)));
  }
}

export class Tag extends Entity {
  public name: string;
  public type: TagType;

  constructor(id: IdentifierType, name: string, type: TagType);
  constructor(resource: TagResource);
  constructor()
  constructor(item?: IdentifierType | TagResource, name?: string, type?: TagType) {
    if (item === undefined) {
      super(Identifier.nil);
      this.name = '';
      this.type = TagType.UserDefined;
    } else if (typeof item === 'string') {
      super(item);
      this.name = name!;
      this.type = type!;
    } else {
      super(Utilities.resolveId(item.href));
      this.name = item.name,
      this.type = item.type;
    }
  }

  public static empty(): Tag {
    return new Tag(Identifier.nil, '', TagType.UserDefined);
  }

  public copy(): Tag {
    return new Tag(this.id, this.name, this.type);
  }

  public toDto(): TagDto {
    return {
      name: this.name
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

    if (this.type !== TagType.UserDefined && this.type !== TagType.Project) {
      errors.push(`Type ${this.type} is invalid.`)
    }

    return errors;
  }

  public isUserDefined(): boolean {
    return this.type === TagType.UserDefined;
  }
}
