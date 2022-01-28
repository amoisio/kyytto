import { Tag } from '../resources/tags/tag.js';
import { Project } from '../resources/projects/project.js';
import { Task } from '../resources/tasks/task.js';
import { Stack } from '../resources/stacks/stack.js';
import Repository from './repository.js';
import { User } from '../resources/users/user.js';

/**
 * Represents an atomic operation against an underlying data store.
 */
export default interface UnitOfWork {
    projectRepository: Repository<Project>;
    taskRepository: Repository<Task>;
    tagRepository: Repository<Tag>;
    stackRepository: Repository<Stack>
    userRepository: Repository<User>

    /**
     * Close the active unit of work context. This can be, for example, committing a database transaction hence persisting
     * the altered state into the underlying tables.
     */
    closeContext(): Promise<void>;
}
