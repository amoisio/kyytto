import { Identifier } from 'kyytto-models';

export interface KyyttoLinks {
  newTask: Link,
  board: Link,
  projects: Link
}

export interface Link {
  name: string,
  path: string,
  title: string,
  icon: string
}

export const menuLinks: KyyttoLinks = {
  newTask: {
    name: 'task',
    path: `/task/${Identifier.nil}`,
    title: 'New',
    icon: 'plus-circle'
  },
  board: {
    name: 'board',
    path: '/board',
    title: 'Board',
    icon: 'list-check'
  },
  projects: {
    name: 'projects',
    path: '/projects',
    title: 'Projects',
    icon: 'tags'
  },

};
