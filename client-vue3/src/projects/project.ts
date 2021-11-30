import { IResource } from '../iresource';

export interface IProject extends IResource {
  name: string;
  description: string;
  color: string;
}
export interface IProjects extends IResource {
  projects: IProject[];
}
export interface INewProject {
  name: string;
  description: string;
}
