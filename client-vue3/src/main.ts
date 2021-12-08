import * as Vue from 'vue';
import * as VueRouter from 'vue-router';
import App from './app.vue';
import BoardView from './board/board-view.vue';
import ProjectsView from './projects/projects-view.vue';
import BootstrapVue3 from 'bootstrap-vue-3';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';

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
app.use(BootstrapVue3);
app.mount('#app');
