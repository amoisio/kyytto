import { IResource } from '../iresource';

export interface IProject extends IResource {
  name: string | undefined;
  description: string | undefined;
  color: string;
}

export interface IProjects extends IResource {
  projects: IProject[];
}

export class ProjectEditFormModel {
  public name: string | undefined = undefined;
  public description: string | undefined = undefined;
}
