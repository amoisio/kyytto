import { MenuResource } from "kyytto-models";
import { api } from '../../api';

export const menu: MenuResource = {
  href: api.menu.path,
  projects: {
    href: api.projects.path,
    title: 'Projects'
  },
  tasks: {
    href: api.tasks.path,
    title: 'Board'
  }
};
