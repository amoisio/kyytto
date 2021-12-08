import * as Vue from 'vue';
import * as VueRouter from 'vue-router';
import App from './app.vue';
import BoardView from './board/board-view.vue';
import ProjectsView from './projects/projects-view.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGraduationCap, faCalendarAlt, faClipboardList, faPen, faEdit, faPlus, faPlusSquare, faCheck, faTasks, faProjectDiagram } from '@fortawesome/free-solid-svg-icons';
import BootstrapVue3 from 'bootstrap-vue-3';

library.add(
  faGraduationCap,
  faCalendarAlt,
  faClipboardList,
  faPen,
  faEdit,
  faPlus,
  faPlusSquare,
  faCheck,
  faTasks,
  faProjectDiagram
);

const routes = [
  { path: '/board', component: BoardView },
  { path: '/projects', component: ProjectsView }
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes
});

const app = Vue.createApp(App);
app.use(router);
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(BootstrapVue3);
app.mount('#app');
