import { Entity } from '@/shared/entity';
import { Identifier, IdentifierType, MatchType, StackDto, StackResource, TagResource, Utilities } from 'k-models';
import { Tag, TagCollection } from '../tags/tag-models';
import { Task } from '../tasks/task-models';

export class StackCollection extends Array<Stack> {
  constructor(resources: [stack: StackResource, tags: TagResource[]][])
  constructor(capacity: number)
  constructor()
  constructor(val?: number | [stack: StackResource, tags: TagResource[]][]) {
    if (val === undefined) {
      super();
    } else if (typeof val === "number") {
      super(val);
    } else {
      const tags = val.map(r => new Stack(r[0], r[1]));
      super(...tags);
    }
  }
}

export class Stack extends Entity<StackDto> {
  public name: string;
  public description: string;
  public match: MatchType;
  public tags: Tag[];

  public constructor(id: IdentifierType, tags: Tag[], name: string, description: string | undefined, match: MatchType);
  public constructor(resource: StackResource, tags: TagResource[]);
  public constructor();
  public constructor(item?: IdentifierType | StackResource, tags?: Tag[] | TagResource[], name?: string, description?: string, match?: MatchType) {
    if (item === undefined) {
      super(Identifier.nil);
      this.name = '';
      this.description = '';
      this.match = MatchType.Exact;
      this.tags = [];
    } else if (typeof item === 'string') {
      super(item);
      this.name = name!;
      this.description = description ?? '';
      this.match = match!;
      this.tags = tags as Tag[];
    } else {
      super(Utilities.resolveId(item.href));
      this.name = item.name;
      this.description = item.description ?? '';
      this.match = item.match;
      this.tags = new TagCollection(tags as TagResource[]);
    }
  }

  public copy(): Stack {
    const tags = this.tags.map(tag => tag.copy());
    return new Stack(this.id, tags, this.name, this.description, this.match);
  }

  public toDto(): StackDto {
    return {
      name: this.name,
      description: this.description,
      match: this.match,
      tagIds: this.tags.map(tag => tag.id)
    };
  }

  public validate(): string[] {
    const errors: string[] = [];

    if (!Identifier.isValidOrNil(this.id)) {
      errors.push(`Id ${this.id} is invalid.`)
    }

    if (Utilities.isEmpty(this.name)) {
      errors.push('Name must not be empty.');
    }

    return errors;
  }

  public isStackTask(task: Task): boolean {
    let isMatch = false;
    switch (this.match) {
      case MatchType.Exact:
        isMatch = Utilities.matchExact(task.tags, this.tags)
        break;
      case MatchType.Any:
        isMatch = Utilities.matchAny(task.tags, this.tags);
        break;
      case MatchType.All:
        isMatch = Utilities.matchAll(task.tags, this.tags);
        break;
      default:
        break;
    }
    return isMatch;
  }
}
