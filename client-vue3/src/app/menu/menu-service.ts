import { kyyttoClient } from '@/app/api';
import { Link } from 'kyytto-models';

export interface IMenuService {
  getAll(): Promise<Link[]>;
}

export class LocalMenuService implements IMenuService {
  public async getAll(): Promise<Link[]> {
    return [
      {
        href: 'http://localhost:8080/board',
        title: 'Board',
        icon: 'list-check'
      },
      {
        href: 'http://localhost:8080/projects',
        title: 'Projects',
        icon: 'tags'
      }
    ];
  }
}

export class MenuService implements IMenuService {
  public async getAll(): Promise<Link[]> {
    const menu = await kyyttoClient.getMenu();
    const links = new Array<Link>();
    links.push({
      href: menu.projects.href,
      title: menu.projects.title,
      icon: 'list-check'
    });
    links.push({
      href: menu.tasks.href,
      title: menu.tasks.title,
      icon: 'tags'
    });
    return links;
  }
}
