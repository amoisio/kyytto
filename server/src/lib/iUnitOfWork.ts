import { Project } from "../cases/projects/project";
import { Task } from "../cases/tasks/task";
import IRepository from "./iRepository";

export default interface IUnitOfWork {
    projectRepository: IRepository<Project>;
    taskRepository: IRepository<Task>;
    startSession(): Promise<void>;
    closeSession(): Promise<void>;
}