import * as Vue from 'vue';
import * as VueRouter from 'vue-router';
import BootstrapVue3 from 'bootstrap-vue-3';
import App from './app/app.vue';
import { provider as services } from './app/service-provider';
import { provider as authentication } from './app/authentication-provider';
import { buildRoutes } from './app/routes';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';
import Notifications from '@kyvg/vue3-notification'
import KButtonCancel from '@/shared/k-button-cancel.vue';
import KButtonComplete from '@/shared/k-button-complete.vue';
import KButtonDanger from '@/shared/k-button-danger.vue';
import KButtonEdit from '@/shared/k-button-edit.vue';
import KButtonNew from '@/shared/k-button-new.vue';
import KButtonPin from '@/shared/k-button-pin.vue';
import KButtonRemove from '@/shared/k-button-remove.vue';
import KButtonSave from '@/shared/k-button-save.vue';
import KButtonStart from '@/shared/k-button-start.vue';
import KButtonStop from '@/shared/k-button-stop.vue';
import KButtonSuccess from '@/shared/k-button-success.vue';
import KButtonWarning from '@/shared/k-button-warning.vue';
import KButton from '@/shared/k-button.vue';

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes: buildRoutes(services)
});

const app = Vue.createApp(App);
app.use(router);
app.use(BootstrapVue3);
app.use(Notifications);

app.component('k-button-cancel', KButtonCancel);
app.component('k-button-complete', KButtonComplete);
app.component('k-button-danger', KButtonDanger);
app.component('k-button-edit', KButtonEdit);
app.component('k-button-new', KButtonNew);
app.component('k-button-pin', KButtonPin);
app.component('k-button-remove', KButtonRemove);
app.component('k-button-save', KButtonSave);
app.component('k-button-start', KButtonStart);
app.component('k-button-stop', KButtonStop);
app.component('k-button-success', KButtonSuccess);
app.component('k-button-warning', KButtonWarning);
app.component('k-button', KButton);

// DI services via a custom '$service' global property
app.config.globalProperties.$services = services;
app.config.globalProperties.$authentication = authentication;

app.mount('#app');
