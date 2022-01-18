import { MenuResource } from 'kyytto-models';
import { api } from '../api.js';

export const menu: MenuResource = {
  href: api.menu.resolveHref(),
  title: 'Menu',
  children: [{
    href: api.projects.resolveHref(),
    title: 'Projects'
  }, {
    href: api.tasks.resolveHref(),
    title: 'Board'
  }, {
    href: api.tags.resolveHref(),
    title: 'Tags'
  }]
};
