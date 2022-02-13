import { api, MenuResource } from 'k-models';

export function menuBuilder(baseUrl: string): MenuResource {
  return {
    href: api.menu.resolve(baseUrl),
    title: 'Menu',
    children: [{
      href: api.projects.resolve(baseUrl),
      title: 'Projects'
    }, {
      href: api.tasks.resolve(baseUrl),
      title: 'Board'
    }, {
      href: api.tags.resolve(baseUrl),
      title: 'Tags'
    }, {
      href: api.stacks.resolve(baseUrl),
      title: 'Stacks'
    }, {
      href: api.users.resolve(baseUrl),
      title: 'Users'
    }]
  };
}
