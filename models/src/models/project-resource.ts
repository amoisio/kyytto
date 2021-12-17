import { Resource } from "./resource";

export interface ProjectResource extends Resource {
  name: string;
  description?: string;
  color: string;
}
