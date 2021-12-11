import BoardView from './board/board-view.vue';
import TaskView from './board/task-view.vue';
import ProjectsView from './projects/projects-view.vue';
import ProjectView from './projects/project-view.vue';

export const routes = [
  {
    name: 'board',
    path: '/board',
    component: BoardView
  },
  {
    name: 'task',
    path: '/task/:id',
    component: TaskView,
    props: true
  },
  {
    name: 'projects',
    path: '/projects',
    component: ProjectsView
  },
  {
    name: 'project-form',
    path: '/projects/:id',
    component: ProjectView,
    props: true
  }
];