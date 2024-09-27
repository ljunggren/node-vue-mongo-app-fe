import Vue from 'vue';
import App from './App.vue';
import router from './router';  // Correctly import the router

Vue.config.productionTip = false;

new Vue({
  router,  // Pass the router instance to the Vue instance
  render: h => h(App),
}).$mount('#app');
