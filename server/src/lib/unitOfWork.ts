import { Project } from "../cases/projects/project";
import { Task } from "../cases/tasks/task";
import Repository from "./repository";

export default interface UnitOfWork {
    projectRepository: Repository<Project>;
    taskRepository: Repository<Task>;
    startSession(): Promise<void>;
    closeSession(): Promise<void>;
}