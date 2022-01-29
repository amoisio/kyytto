import BoardView from './board/board-view.vue';
import TaskView from './board/task-view.vue';
import ProjectListView from './projects/project-list-view.vue';
import ProjectView from './projects/project-view.vue';
import StackListView from './stacks/stack-list-view.vue';
import StackView from './stacks/stack-view.vue';
import UserView from './users/user-view.vue';
import { menuLinks, userLink } from './menu/menu-links';
import { RouteLocation, useLink } from 'vue-router';
import { Identifier } from 'kyytto-models';
import TagListView from './tags/tag-list-view.vue';
import { ServiceProvider } from './service-provider';

function identifierResolver(route: RouteLocation) {
  const idStr = route.params.id as string;
  return {
    id: Identifier.build(idStr)
  }
}

export const buildRoutes = (services: ServiceProvider) => {
  return [
    {
      name: menuLinks.board.name,
      path: menuLinks.board.path,
      component: BoardView
    },
    {
      name: 'task',
      path: '/task/:id',
      component: TaskView,
      props: identifierResolver
    },
    {
      name: menuLinks.projects.name,
      path: menuLinks.projects.path,
      component: ProjectListView
    },
    {
      name: 'project-form',
      path: '/projects/:id',
      component: ProjectView,
      props: identifierResolver
    },
    {
      name: menuLinks.tags.name,
      path: menuLinks.tags.path,
      component: TagListView
    },
    {
      name: menuLinks.stacks.name,
      path: menuLinks.stacks.path,
      component: StackListView
    },
    {
      name: 'stack-form',
      path: '/stacks/:id',
      component: StackView,
      props: identifierResolver
    },
    {
      name: userLink.name,
      path: userLink.path,
      component: UserView
    }];
};
