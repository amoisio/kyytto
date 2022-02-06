import { MenuResource } from 'k-models';
import { api } from '../api.js';

export const menu: MenuResource = {
  href: api.menu.resourceHref(),
  title: 'Menu',
  children: [{
    href: api.projects.resourceHref(),
    title: 'Projects'
  }, {
    href: api.tasks.resourceHref(),
    title: 'Board'
  }, {
    href: api.tags.resourceHref(),
    title: 'Tags'
  }, {
    href: api.stacks.resourceHref(),
    title: 'Stacks'
  }, {
    href: api.users.resourceHref(),
    title: 'Users'
  }]
};
