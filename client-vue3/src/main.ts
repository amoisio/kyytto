import * as Vue from 'vue';
import * as VueRouter from 'vue-router';
import App from './app.vue';
import TodoView from './todos/todo-view.vue';
import LearningView from './learning/learning-view.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGraduationCap, faCalendarAlt, faClipboardList, faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';

library.add(faGraduationCap, faCalendarAlt, faClipboardList, faPlus, faCheck);

const Hours = { template: '<div>hours</div>' };

const routes = [
  { path: '/learning', component: LearningView },
  { path: '/hours', component: Hours },
  { path: '/todos', component: TodoView }
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes
});

const app = Vue.createApp(App);
app.use(router);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');
