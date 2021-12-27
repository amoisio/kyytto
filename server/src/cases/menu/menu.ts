import { MenuResource } from 'kyytto-models';
import { api } from 'api.js';

export const menu: MenuResource = {
  href: api.menu.resolveHref(),
  projects: {
    href: api.projects.resolveHref(),
    title: 'Projects'
  },
  tasks: {
    href: api.tasks.resolveHref(),
    title: 'Board'
  }
};
