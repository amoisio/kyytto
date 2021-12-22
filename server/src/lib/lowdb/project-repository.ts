
import Repository from '../repository.js';
import { Project } from '../../cases/projects/project.js';
import { Low, JSONFile } from 'lowdb'
import { DataDb, ProjectDb } from './db-model.js';

export default class ProjectRepository implements Repository<Project> {
  private readonly db: Low<DataDb>;

  constructor(filePath: string) {
    const adapter = new JSONFile<DataDb>(filePath)
    this.db = new Low<DataDb>(adapter)
  }

  public async getAll(): Promise<Project[]> {
    await this.db.read();
    if (this.db.data !== null && this.db.data.projects !== null) {
      return this.db.data.projects.map(p => this.constructProject(p));
    } else {
      return [];
    }
  }

  private constructProject(model: ProjectDb): Project {
    return new Project(
      model.id,
      model.name,
      model.description,
      model.color
    );
  }

  public async get(id: string): Promise<Project> {
    await this.db.read();
    if (this.db.data !== null && this.db.data.projects !== null) {
      const match = this.db.data.projects.find(p => p.id === id);
      if (match !== undefined) {
        return this.constructProject(match);
      }
    } 
    throw new Error(`No Project found for ${id}.`);
  }

  public async create(project: Project): Promise<string> {
    await this.db.read();
    this.db.data ||= { projects: [], tasks: [] };
    this.db.data.projects ||= [];
    this.db.data.projects.push({
      id: project.id,
      name: project.name,
      description: project.description,
      color: project.color
    });
    this.db.write();
    return project.id;
  }

  public async update(project: Project): Promise<void> {
    await this.db.read();
    if (this.db.data !== null && this.db.data.projects !== null) {
      const match = this.db.data.projects.find(p => p.id === project.id);
      if (match !== undefined) {
        match.name = project.name;
        match.description = project.description;
        match.color = project.color;
        this.db.write();
      }
    }
    throw new Error(`No Project found for ${project.id}.`);
  }
}
