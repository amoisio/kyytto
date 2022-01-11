import * as Vue from 'vue';
import * as VueRouter from 'vue-router';
import BootstrapVue3 from 'bootstrap-vue-3';
import App from './app/app.vue';
import { routes } from './app/routes';
import { provider } from './app/service-provider';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';
import Notifications from '@kyvg/vue3-notification'

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes
});

const app = Vue.createApp(App);
app.use(router);
app.use(BootstrapVue3);
app.use(Notifications);

// DI services via a custom '$service' global property
app.config.globalProperties.$services = provider;

app.mount('#app');
