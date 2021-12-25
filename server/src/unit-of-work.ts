import { Project } from './cases/projects/project.js';
import { Task } from './cases/tasks/task.js';
import Repository from './repository.js';

export default interface UnitOfWork {
    projectRepository: Repository<Project>;
    taskRepository: Repository<Task>;
    startSession(): Promise<void>;
    closeSession(): Promise<void>;
}

export type builder = () => UnitOfWork;
