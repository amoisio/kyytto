import { Resource, ResourceReference } from "./resource";
import { TaskState } from "./task-state";

export interface TaskResource extends Resource {
  title: string;
  description?: string;
  state: TaskState;
  projectHref?: ResourceReference;
}
