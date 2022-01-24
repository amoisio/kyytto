import { TagBuilder } from '../resources/tags/tag.js';
import { ProjectBuilder } from '../resources/projects/project.js';
import { TaskBuilder } from '../resources/tasks/task.js';
import UnitOfWork from '../storage/unit-of-work.js';
import { ColorGenerator } from '../utilities/color-generator.js';
import { IdentifierGenerator } from '../utilities/identifier-generator.js';
import { TagService } from '../resources/tags/tag-service.js';
import { StackBuilder } from '../resources/stacks/stack.js';
import { IdentifierType } from 'kyytto-models';

declare global {
  namespace Express {
    interface Request {
      id: IdentifierType,
      bodyAs: <TDto>() => TDto;
      idGenerator: IdentifierGenerator,
      colorGenerator: ColorGenerator,
      unitOfWork: UnitOfWork;
      projectBuilder: ProjectBuilder,
      taskBuilder: TaskBuilder,
      tagBuilder: TagBuilder,
      stackBuilder: StackBuilder
      tagService: TagService
    }
  }
}
