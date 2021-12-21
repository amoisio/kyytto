import { Resource } from "./resource";

export interface MenuResource extends Resource {
  projects: MenuItemResource;
  tasks: MenuItemResource;
}
export interface MenuItemResource extends Resource {
  title: string
}