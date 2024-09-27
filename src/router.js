import Vue from 'vue';
import Router from 'vue-router';  // Make sure you are importing the Router from 'vue-router'

import UserManager from './components/UserManager.vue';
import DashboardManager from './components/DashboardManager.vue';
import PropertyManager from './components/PropertyManager.vue';
import TenantManager from './components/TenantManager.vue';
import ContractManager from './components/ContractManager.vue';

Vue.use(Router);

export default new Router({
  mode: 'history', // Optional: removes the hash from the URL
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: DashboardManager,
    },
    {
      path: '/users',
      name: 'Users',
      component: UserManager,
    },
    {
      path: '/properties',
      name: 'Properties',
      component: PropertyManager,
    },
    {
      path: '/tenants',
      name: 'Tenants',
      component: TenantManager,
    },
    {
      path: '/contracts',
      name: 'Contracts',
      component: ContractManager,
    },
  ],
});
