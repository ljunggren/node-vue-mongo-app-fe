<!-- src/App.vue -->

<template>
  <div class="layout-wrapper">
    <!-- Sidebar -->
    <div class="sidebar">
      <h2>Menu</h2>
      <ul>
        <li><router-link to="/">Dashboard</router-link></li>
        <!-- <li><router-link to="/users">Users</router-link></li> -->
        <li><router-link to="/properties">Properties</router-link></li>
        <li><router-link to="/tenants">Tenants</router-link></li>
        <li><router-link to="/contracts">Contracts</router-link></li>
        <!-- Logout Button -->
        <li v-if="isAuthenticated">
           <!-- User Information -->
          <!-- <img alt="User Avatar" src="/images/usercard.png" class="user-avatar" /> -->
          <!-- <p class="user-name">{{ user.firstName }} {{ user.lastName }}</p> -->
          <Button
            label="Logout"
            icon="pi pi-sign-out"
            class="p-button-text p-button-danger"
            @click="logout"
          />
        </li>
        <!-- Login and Register Links for Guests -->
        <li v-else>
          <br/>
          <br/>
          You are not logged in. <router-link to="/login">Login</router-link>
        </li>
      </ul>
    </div>

    <!-- Main Content -->
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    // Access authentication status from Vuex store
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
     // Access user data from Vuex store
    user() {
      return this.$store.getters.getUser;
    },
  },
  methods: {
    logout() {
      // Dispatch the logout action
      this.$store.dispatch('logout');
      // Redirect to the login page
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped>
.layout-wrapper {
  display: flex;
  height: 100vh;
}

.sidebar {
  width: 200px;
  background-color: #f8f9fa;
  padding: 1em;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

.sidebar h2 {
  margin-bottom: 1em;
  font-size: 1.5em;
  color: #343a40;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar li {
  margin-bottom: 0.75em;
}

.sidebar a {
  text-decoration: none;
  color: #343a40;
  font-weight: 500;
}

.sidebar a:hover {
  color: #007bff;
}

.content {
  flex: 1;
  padding: 2em;
  background-color: #ffffff;
}

.user-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-bottom: 0.5em;
}
</style>
