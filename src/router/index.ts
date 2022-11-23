import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Bills from "@/views/Bills.vue";
import Money from "@/views/Money.vue";
import Statistics from "@/views/Statistics.vue";
import EditTag from "@/views/EditTag.vue";
import ManageTags from "@/views/ManageTags.vue";
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
  {
    path: '/editTag',
    component: EditTag
  },
  {
    path: '/manageTags',
    component: ManageTags
  },
];

const router = new VueRouter({
  routes
});

export default router;
