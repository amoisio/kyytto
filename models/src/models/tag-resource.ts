import { Resource } from './resource.js';
import { TagType } from './tag-type.js';

export interface TagResource extends Resource {
  name: string;
  type: TagType;
}
