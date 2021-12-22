import { Resource } from './resource.js';

export interface ProjectResource extends Resource {
  name: string;
  description?: string;
  color: string;
}
