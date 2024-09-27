<template>
  <div id="app">
    <h1>User List</h1>
    <ul>
      <li v-for="user in users" :key="user._id">
        {{ user.name }} - {{ user.email }}
      </li>
    </ul>

    <h2>Add a New User</h2>
    <form @submit.prevent="addUser">
      <input v-model="name" placeholder="Name" required />
      <input v-model="email" placeholder="Email" required />
      <input v-model="password" placeholder="Password" type="password" required />
      <button type="submit">Add User</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      users: [],
      name: "",
      email: "",
      password: "",
    };
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get("http://localhost:8000/api/users");
        this.users = response.data;
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },
    async addUser() {
      try {
        const newUser = {
          name: this.name,
          email: this.email,
          password: this.password,
        };
        await axios.post("http://localhost:8000/api/users", newUser);
        this.name = "";
        this.email = "";
        this.password = "";
        this.fetchUsers(); // Refresh the user list
      } catch (error) {
        console.error("Error adding user:", error);
      }
    },
  },
  mounted() {
    this.fetchUsers(); // Fetch users when the component is mounted
  },
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 40px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  padding: 10px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  margin-bottom: 10px;
}

form {
  margin-top: 20px;
}

input {
  margin: 5px;
  padding: 8px;
  font-size: 14px;
}

button {
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #2a9f71;
}
</style>
