import { IProject } from "@/projects/project";
import { TaskState } from "./task-state";

export class TaskEditFormModel {
    public title: string | undefined = undefined;
    public description: string | undefined = undefined;
    public project : IProject | undefined = undefined;
    public state: TaskState = TaskState.Todo;
}
