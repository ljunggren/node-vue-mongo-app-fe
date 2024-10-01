// frontend/src/router.js
import { createRouter, createWebHistory } from 'vue-router';

import UserManager from './components/UserManager.vue';
import DashboardManager from './components/DashboardManager.vue';
import PropertyManager from './components/PropertyManager.vue';
import TenantManager from './components/TenantManager.vue';
import ContractManager from './components/ContractManager.vue';

const routes = [
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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
