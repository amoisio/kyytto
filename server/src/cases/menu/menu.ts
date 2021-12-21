import { MenuItemResource, MenuResource } from "kyytto-models";
import { api } from '../../api';

export class Menu implements MenuResource {
  public readonly href: string;
  public readonly projects: MenuItemResource;
  public readonly tasks: MenuItemResource;
  
  constructor() {
    this.href = api.menu.path;
    this.projects = {
      href: api.projects.path,
      title: 'Project'
    };
    this.tasks = {
      href: api.tasks.path,
      title: 'Board'
    };
  }  
}

