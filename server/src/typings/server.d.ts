import { ProjectBuilder } from '../resources/projects/project.js';
import { TaskBuilder } from '../resources/tasks/task.js';
import UnitOfWork from '../storage/unit-of-work.js';
import { ColorGenerator } from '../utilities/color-generator.js';
import { IdentifierGenerator } from '../utilities/identifier-generator.js';

declare global {
  namespace Express {
    interface Request {
      unitOfWork: UnitOfWork;
      colorGenerator: ColorGenerator,
      idGenerator: IdentifierGenerator,
      projectBuilder: ProjectBuilder,
      taskBuilder: TaskBuilder
    }
  }
}
