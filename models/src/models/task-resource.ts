import { Resource, ResourceReference } from './resource.js';
import { TagResource } from './tag-resource.js';
import { TaskState } from './task-state.js';

export interface TaskResource extends Resource {
  title: string;
  description?: string;
  state: TaskState;
  projectHref: ResourceReference;
  tags: TagResource[];
}
