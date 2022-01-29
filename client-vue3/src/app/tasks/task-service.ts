import { Task } from './task-models';
import { Identifier, IdentifierType, KyyttoClient, Utilities } from 'kyytto-models';
import { ProjectService } from '../projects/project-service';
import { TagService } from '../tags/tag-service';

export interface TaskService {
  save(task: Task): Promise<IdentifierType>;
  create(task: Task): Promise<IdentifierType>;
  getAll(): Promise<Task[]>;
  getById(id: IdentifierType): Promise<Task>
  update(task: Task): Promise<IdentifierType>;
  delete(id: IdentifierType): Promise<void>;
}

export class ApiTaskService implements TaskService {
  private readonly client: KyyttoClient;
  private readonly projectService: ProjectService;
  private readonly tagService: TagService;

  constructor(client: KyyttoClient, projectService: ProjectService, tagService: TagService) {
    this.client = client;
    this.projectService = projectService;
    this.tagService = tagService;
  }

  public async save(task: Task): Promise<IdentifierType> {
    if (Identifier.isNil(task.id)) {
      return await this.create(task);
    } else {
      return await this.update(task);
    }
  }

  public async create(task: Task): Promise<IdentifierType> {
    const dto = task.toDto();
    const id = await this.client.tasks.create(dto);
    return id;
  }

  public async getAll(): Promise<Task[]> {
    const taskResources = await this.client.tasks.getAll();
    const projectResources = await this.client.projects.getAll();
    const tagResources = await this.client.tags.getAll();
    return taskResources.map(task => {
      const project = projectResources.find(p => p.href === task.projectHref);
      const tags = tagResources.filter(t => task.tagHrefs.includes(t.href));
      if (project === undefined) {
        throw new Error('Project reference was missing.');
      }
      return new Task(task, project, tags);
    });
  }

  public async getById(id: IdentifierType): Promise<Task> {
    const taskResource = await this.client.tasks.getById(id);
    const projectId = Utilities.resolveId(taskResource.projectHref);
    const projectResource = await this.client.projects.getById(projectId);
    const tagResources = await Promise.all(taskResource.tagHrefs.map(async (t) => {
      const tagId = Utilities.resolveId(t);
      return await this.client.tags.getById(tagId);
    }));
    return new Task(taskResource, projectResource, tagResources);
  }

  public async update(task: Task): Promise<IdentifierType> {
    const dto = task.toDto()
    await this.client.tasks.update(task.id, dto);
    return task.id;
  }

  public async delete(id: IdentifierType): Promise<void> {
    await this.client.tasks.delete(id);
  }
}
