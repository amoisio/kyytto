import { Identifier } from 'kyytto-models';

export interface KyyttoLinks {
  newTask: Link,
  work: Link,
  tasks: Link,
  projects: Link,
  tags: Link,
  stacks: Link
}

export interface Link {
  name: string,
  path: string,
  title: string,
  icon: string,
}

export const menuLinks: KyyttoLinks = {
  newTask: {
    name: 'task',
    path: `/task/${Identifier.nil}`,
    title: 'New',
    icon: 'plus-circle'
  },
  work: {
    name: 'work',
    path: '/',
    title: 'Home',
    icon: 'house'
  },
  tasks: {
    name: 'tasks',
    path: '/tasks',
    title: 'Tasks',
    icon: 'collection'
  },
  projects: {
    name: 'projects',
    path: '/projects',
    title: 'Projects',
    icon: 'box'
  },
  tags: {
    name: 'tags',
    path: '/tags',
    title: 'Tags',
    icon: 'tags'
  },
  stacks: {
    name: 'stacks',
    path: '/stacks',
    title: 'Stacks',
    icon: 'stack'
  }
};

export const userLink: Link = {
  name: 'user',
  path: '/user',
  title: 'User',
  icon: 'person-circle'
};