import * as Vue from 'vue';
import * as VueRouter from 'vue-router';
import App from './app.vue';
import TodosView from './todos/todos-view.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGraduationCap, faCalendarAlt, faClipboardList, faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';

library.add(faGraduationCap, faCalendarAlt, faClipboardList, faPlus, faCheck);

const Learning = { template: '<div>learning</div>' };
const Hours = { template: '<div>hours</div>' };

const routes = [
  { path: '/learning', component: Learning },
  { path: '/hours', component: Hours },
  { path: '/todos', component: TodosView }
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes
});

const app = Vue.createApp(App);
app.use(router);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');
