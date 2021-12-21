import { ResourceReference } from "src";
import { Api } from "src/utilities/api";
import { Resource } from "./resource";

export default class Menu implements Resource {
  public readonly href: ResourceReference;
  public readonly projects: MenuItem;
  public readonly tasks: MenuItem;

  constructor(api: Api) {
    this.href = api.menu.path;
    this.projects = new MenuItem(api.projects.path, 'Projects');
    this.tasks = new MenuItem(api.tasks.path, 'Board');
  }
}

export class MenuItem implements Resource {
  constructor(
    public readonly href: ResourceReference,
    public readonly title: string) { }

}