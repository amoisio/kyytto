import { Link } from 'kyytto-models';

export interface IMenuService {
  getAll(): Link[];
}

export class MenuService implements IMenuService {
  public getAll(): Link[] {
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
