// src/router/index.js
console.log("router/index.js")
import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';

import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import Dashboard from '../components/DashboardManager.vue';
import Users from '../components/UserManager.vue';
import Tenants from '../components/TenantManager.vue';
import Properties from '../components/PropertyManager.vue';
import Contracts from '../components/ContractManager.vue';

const routes = [
  { path: '/', redirect: '/dashboard' },
  { path: '/login', component: Login, meta: { guestOnly: true } },
  { path: '/register', component: Register, meta: { guestOnly: true } },
  { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/users', component: Users, meta: { requiresAuth: true } },
  { path: '/tenants', component: Tenants, meta: { requiresAuth: true } },
  { path: '/properties', component: Properties, meta: { requiresAuth: true } },
  { path: '/contracts', component: Contracts, meta: { requiresAuth: true } },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation Guards
router.beforeEach((to, from, next) => {
  console.log("### BANANA ###");
  const isAuthenticated = store.getters.isAuthenticated;
  console.log("### BANANA ###", isAuthenticated);

  console.log("Before navigation: ",isAuthenticated)
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else if (to.meta.guestOnly && isAuthenticated) {
    next('/dashboard');
  } else {
    next();
  }
});

export default router;
