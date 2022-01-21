import { Entity } from '@/shared/entity';
import { Color, ColorType, Identifier, IdentifierType, ProjectDto, ProjectResource, Utilities } from 'kyytto-models';

export class ProjectCollection extends Array<Project> {
  constructor(resources: ProjectResource[]) {
    super(...resources.map(r => new Project(r)))
  }
}

export class Project extends Entity {
  public name: string;
  public description: string;
  public color: ColorType;

  public constructor(id: IdentifierType, name: string, description: string, color: ColorType);
  public constructor(resource: ProjectResource);
  public constructor();
  public constructor(item?: IdentifierType | ProjectResource, name?: string, description?: string, color?: ColorType) {
    if (item === undefined) {
      super(Identifier.nil);
      this.name = '';
      this.description = '';
      this.color = Color.build('ffffff');
    } else if (typeof item === 'string') {
      super(item);
      this.name = name!;
      this.description = description!;
      this.color = color!;
    } else {
      super(Utilities.resolveId(item.href));
      this.name = item.name;
      this.description = item.description ?? '';
      this.color = Color.build(item.color);
    }
  }

  public copy(): Project {
    return new Project(
      Identifier.build(this.id),
      this.name,
      this.description,
      Color.build(this.color));
  }

  public toDto(): ProjectDto {
    return {
      name: this.name,
      description: this.description,
      color: Color.build(this.color)
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

    if (!Color.isValid(this.color)) {
      errors.push(`Color ${this.color} is invalid.`);
    }

    return errors;
  }
}
