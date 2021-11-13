import * as Vue from 'vue'
import * as VueRouter from 'vue-router'
import App from './App.vue'

const Learning = { template: '<div>learning</div>' }
const Hours = { template: '<div>hours</div>' }
const Todos = { template: '<div>todos</div>' }

const routes = [
  { path: '/learning', component: Learning },
  { path: '/hours', component: Hours },
  { path: '/todos', component: Todos }
]

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes
})

const app = Vue.createApp(App)
app.use(router)
app.mount('#app')
