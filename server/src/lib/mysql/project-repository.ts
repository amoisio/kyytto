import { Connection, RowDataPacket } from 'mysql2/promise';
import Repository from '../repository';
import { Project } from '../../cases/projects/project';

export default class ProjectRepository implements Repository<Project> {
  constructor(private connection: Connection) {}

  public async getAll(): Promise<Project[]> {
    const cmd = this.selectAll;
    const rowData = await this.connection.execute<RowDataPacket[]>(cmd);
    if (rowData[0].length == 0) {
      return [];
    } else {
      return rowData[0].map(row => this.constructProject(row));
    }
  }

  private selectAll = `
        select p.id, p.name, p.description, p.color
        from projects p;`;

  public async get(id: string): Promise<Project> {
    const cmd = this.selectNoteById;
    const rowData = await this.connection.execute<RowDataPacket[]>(cmd, [id]);
    if (rowData[0].length == 0) {
      throw new Error(`No Project found for ${id}.`);
    } else {
      return this.constructProject(rowData[0][0]);
    }
  }

  private selectNoteById = `
        select p.id, p.name, p.description, p.color
        from projects p
        where
            p.id = ?;`;

  public async create(project: Project): Promise<string> {
    await this.connection.beginTransaction();
    try {
      await this.connection.execute(this.insertProject, [
        project.id,
        project.name,
        project.description,
        project.color,
      ]);
      await this.connection.commit();
    } catch {
      await this.connection.rollback();
    }
    return project.id;
  }

  private insertProject = `
        insert into projects (id, name, description, color)
        values (?, ?, ?, ?);`;

  public async update(project: Project): Promise<void> {
    await this.connection.beginTransaction();
    try {
      await this.connection.execute(this.updateProject, [
        project.name,
        project.description,
        project.color,
        project.id,
      ]);
      await this.connection.commit();
    } catch {
      await this.connection.rollback();
    }
  }

  private updateProject = `
        update projects
        set name = ?, description = ?, color = ?
        where id = ?;`;

  private constructProject(row: RowDataPacket): Project {
    return new Project(
      row.id,
      row.name,
      row.description,
      row.color
    );
  }
}
