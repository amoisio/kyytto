import { IResource } from '../iresource';

export interface IProject extends IResource {
  name: string | undefined;
  description: string | undefined;
  color: string;
}

export interface IProjects extends IResource {
  projects: IProject[];
}

export interface IProjectEditFormModel {
  name: string | undefined;
  description: string | undefined;
}