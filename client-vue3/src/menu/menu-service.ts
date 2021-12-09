import { ILink } from '@/ilink';
export interface IMenuService {
  getAll(): ILink[];
}

export class MenuService implements IMenuService {
  public getAll(): ILink[] {
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
