import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Bills from "@/views/Bills.vue";
import Money from "@/views/Money.vue";
import Statistics from "@/views/Statistics.vue";
import EditTag from "@/views/EditTag.vue";
import ManageTags from "@/views/ManageTags.vue";
import NewTag from "@/views/NewTag.vue";
import NotFound from "@/views/NotFound.vue";
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
    path: '/manageTags',
    component: ManageTags
  },
  {
    path: '/editTag/:id',
    component: EditTag,
  },
  {
    path: '/newTag',
    component: NewTag,
  },
  {
    path: '*',
    component: NotFound,
  }
];

const router = new VueRouter({
  routes
});

export default router;
