import BoardView from './board/board-view.vue';
import TaskView from './board/task-view.vue';
import ProjectListView from './projects/project-list-view.vue';
import ProjectView from './projects/project-view.vue';
import { menuLinks } from './menu/menu-links';
import { RouteLocation } from 'vue-router';
import { idBuilder } from 'kyytto-models';

function identifierResolver(route: RouteLocation) {
  const idStr = route.params.id as string;
  return {
    id: idBuilder(idStr)
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
  }
];
