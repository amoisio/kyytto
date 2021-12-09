import BoardView from './board/board-view.vue';
import ProjectsView from './projects/projects-view.vue';
import ProjectDetailsView from './projects/project-details-view.vue';

export const routes = [
  { path: '/board', component: BoardView },
  {
    name: 'projects',
    path: '/projects',
    component: ProjectsView
  },
  {
    name: 'project-form',
    path: '/projects/:id',
    component: ProjectDetailsView,
    props: true
  }
];
