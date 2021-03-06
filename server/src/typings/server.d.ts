import { TagBuilder } from '../resources/tags/tag.js';
import { ProjectBuilder } from '../resources/projects/project.js';
import { TaskBuilder } from '../resources/tasks/task.js';
import UnitOfWork from '../storage/unit-of-work.js';
import { ColorGenerator } from '../utilities/color-generator.js';
import { IdentifierGenerator } from '../utilities/identifier-generator.js';
import { TagService } from '../resources/tags/tag-service.js';
import { StackBuilder } from '../resources/stacks/stack.js';
import { IdentifierType, KClient } from 'k-models';
import { UserBuilder } from '../resources/users/user.js';

declare global {
  namespace Express {
    interface Request {
      baseUrl: string,
      id: IdentifierType,
      bodyAs: <TDto>() => TDto,
      client: KClient,
      idGenerator: IdentifierGenerator,
      colorGenerator: ColorGenerator,
      unitOfWork: UnitOfWork;
      projectBuilder: ProjectBuilder,
      taskBuilder: TaskBuilder,
      tagBuilder: TagBuilder,
      stackBuilder: StackBuilder
      tagService: TagService
      userBuilder: UserBuilder
    }
  }
}
