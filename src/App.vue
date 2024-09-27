<template>
  <div class="layout-wrapper">
    <!-- Sidebar -->
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

    <!-- Main Content -->
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
/* Layout container for sidebar and content */
.layout-wrapper {
  display: flex;
  min-height: 100vh;
}

/* Sidebar styling */
.sidebar {
  width: 200px;
  background-color: #2d3e50;
  color: #fff;
  padding: 20px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  overflow: auto;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

.sidebar h2 {
  font-size: 1.5rem;
  margin-bottom: 20px;
}

.sidebar ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.sidebar ul li {
  margin: 15px 0;
}

.sidebar ul li a {
  color: #fff;
  text-decoration: none;
  font-size: 1.1rem;
  display: block;
  padding: 10px;
  border-radius: 4px;
  transition: background 0.3s ease;
}

.sidebar ul li a:hover {
  background-color: #3a4a63;
}

/* Main content area */
.content {
  margin-left: 220px; /* Ensure space for sidebar */
  padding: 20px;
  flex-grow: 1;
}
</style>
