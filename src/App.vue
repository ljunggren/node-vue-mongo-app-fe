<template>
  <div id="app">
    <div class="sidebar">
      <h2>Menu</h2>
      <ul>
        <li><router-link to="/">Dashboard</router-link></li>
        <li><router-link to="/users">Users</router-link></li>
        <li><router-link to="/properties">Properties</router-link></li>
        <li><router-link to="/tenants">Tenants</router-link></li>
        <li><router-link to="/contracts">Contracts</router-link></li>
      </ul>
    </div>
    
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style scoped>
#app {
  display: flex;
}

.sidebar {
  width: 200px;
  background-color: #f4f4f4;
  padding: 20px;
  height: 100vh;
  box-shadow: 2px 0 5px rgba(0,0,0,0.1);
}

.sidebar h2 {
  font-size: 1.5em;
}

.sidebar ul {
  list-style-type: none;
  padding: 0;
}

.sidebar ul li {
  margin: 15px 0;
}

.sidebar ul li a {
  text-decoration: none;
  color: #333;
  font-size: 1.2em;
}

.content {
  flex-grow: 1;
  padding: 20px;
}
</style>
