import UnitOfWork from '../unitOfWork';
import ProjectRepository from './project-repository';
import TaskRepository from './task-repository';

export class LowDbUnitOfWork implements UnitOfWork {

  constructor(private readonly filePath: string) { }

  public projectRepository !: ProjectRepository;
  public taskRepository !: TaskRepository;

  public async startSession(): Promise<void> {
    this.projectRepository = new ProjectRepository(this.filePath);
    this.taskRepository = new TaskRepository(this.filePath);
  }

  public async closeSession(): Promise<void> { }
}

export const builder = (filePath: string): UnitOfWork => new LowDbUnitOfWork(filePath);