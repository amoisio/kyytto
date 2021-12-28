import { Project } from '../resources/projects/project.js';
import { Task } from '../resources/tasks/task.js';
import Repository from './repository.js';

/**
 * Represents an atomic operation against an underlying data store.
 */
export default interface UnitOfWork {
    projectRepository: Repository<Project>;
    taskRepository: Repository<Task>;

    /**
     * Close the active unit of work context. This can be, for example, committing a database transaction hence persisting
     * the altered state into the underlying tables.
     */
    closeContext(): Promise<void>;
}
