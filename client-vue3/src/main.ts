import * as Vue from 'vue';
import * as VueRouter from 'vue-router';
import BootstrapVue3 from 'bootstrap-vue-3';
import App from './app/app.vue';
import { provider as services } from './app/service-provider';
import { provider as authentication } from './app/authentication-provider';
import { buildRoutes } from './app/routes';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';
import Notifications from '@kyvg/vue3-notification'
import KComponents from '@/plugins/kyytto/kyytto';

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes: buildRoutes(services)
});

const app = Vue.createApp(App);
app.use(router);
app.use(BootstrapVue3);
app.use(Notifications);
app.use(KComponents);

// DI services via a custom '$service' global property
app.config.globalProperties.$services = services;
app.config.globalProperties.$authentication = authentication;

app.mount('#app');
