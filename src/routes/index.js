import Vue from 'vue';
import VueRouter from 'vue-router';
import Form from '../views/Form.vue';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: Home },
  { path: '/add', component: Form }
];

const router = new VueRouter({
  routes,
  mode: 'history',
  base: process.env.BASE_URL,
});

export default router;
