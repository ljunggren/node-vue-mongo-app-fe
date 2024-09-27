// src/router.js
import { createRouter, createWebHistory } from 'vue-router';

// Import your components
import UserManager from './components/UserManager.vue';
import DashboardManager from './components/DashboardManager.vue';
import PropertyManager from './components/PropertyManager.vue';
import TenantManager from './components/TenantManager.vue';
import ContractManager from './components/ContractManager.vue';

// Define your routes
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

// Create the router instance
const router = createRouter({
  history: createWebHistory(), // You can also use createWebHashHistory() if you prefer hash-based routing
  routes,
});

// Export the router instance
export default router;
