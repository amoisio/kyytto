export interface KyyttoLinks {
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
  }
};
