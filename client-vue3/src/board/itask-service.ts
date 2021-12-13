import { IService } from "@/iservice";
import { IProject } from "@/projects/project-models";
import { ITask } from "./task-models";

export interface ITaskService extends IService<ITask> {
  create(title: string, description: string | undefined, project: IProject): ITask;
}
