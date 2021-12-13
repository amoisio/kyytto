import { IService } from "@/iservice";
import { IProject } from "./project-models";

export interface IProjectService extends IService<IProject> {
  create(name: string, description: string | undefined, color: string): IProject;
}
