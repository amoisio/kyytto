import BoardView from './board/board-view.vue';
import TaskView from './board/task-view.vue';
import ProjectListView from './projects/project-list-view.vue';
import ProjectView from './projects/project-view.vue';
import StackListView from './stacks/stack-list-view.vue';
import StackView from './stacks/stack-view.vue';
import { menuLinks } from './menu/menu-links';
import { RouteLocation } from 'vue-router';
import { Identifier } from 'kyytto-models';

function identifierResolver(route: RouteLocation) {
  const idStr = route.params.id as string;
  return {
    id: Identifier.build(idStr)
  }
}

export const routes = [
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
];
