import BoardView from './board/board-view.vue';
import TaskView from './board/task-view.vue';
import ProjectsView from './projects/projects-view.vue';
import ProjectView from './projects/project-view.vue';
import { menuLinks } from './menu/menu-links';

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
    props: true
  },
  {
    name: menuLinks.projects.name,
    path: menuLinks.projects.path,
    component: ProjectsView
  },
  {
    name: 'project-form',
    path: '/projects/:id',
    component: ProjectView,
    props: true
  }
];
