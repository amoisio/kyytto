import * as Vue from 'vue';
import * as VueRouter from 'vue-router';
import { routes } from './routes';
import App from './app.vue';
import BootstrapVue3 from 'bootstrap-vue-3';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';
import { provider } from './iservice-provider';
import { LocalStorageProjectService } from './projects/project-service';
import { LocalStorageTaskService } from './board/task-service';
import { LocalStorage } from './local-storage';

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes
});

const app = Vue.createApp(App);
app.use(router);
app.use(BootstrapVue3);

// DI services via a custom '$service' global property
const store = new LocalStorage();
provider.projectService = new LocalStorageProjectService(store);
provider.taskService = new LocalStorageTaskService(store);
app.config.globalProperties.$services = provider;

app.mount('#app');
