import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Bills from "@/views/Bills.vue";
import Money from "@/views/Money.vue";
import Statistics from "@/views/Statistics.vue";
Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/bills'
  },
  {
    path: '/bills',
    component: Bills
  },
  {
    path: '/statistics',
    component: Statistics
  },
  {
    path: '/money',
    component: Money
  },
];

const router = new VueRouter({
  routes
});

export default router;
