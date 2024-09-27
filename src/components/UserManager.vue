<template>
  <div class="p-m-3">
    <h2>User Manager</h2>

    <!-- Data Table for Users -->
    <DataTable :value="users" responsiveLayout="scroll" class="p-mt-3">
      <Column field="name" header="Name"></Column>
      <Column field="email" header="Email"></Column>
      <Column field="role" header="Role"></Column>
    </DataTable>

    <!-- Add User Form -->
    <div class="p-mt-4">
      <h3>Add New User</h3>
      <form @submit.prevent="addUser" class="p-fluid">
        <div class="p-field p-grid p-mb-3">
          <label for="name" class="p-col-fixed p-pr-3">Name</label>
          <div class="p-col">
            <InputText id="name" v-model="name" class="input-box" required />
          </div>
        </div>

        <div class="p-field p-grid p-mb-3">
          <label for="email" class="p-col-fixed p-pr-3">Email</label>
          <div class="p-col">
            <InputText id="email" v-model="email" class="input-box" required />
          </div>
        </div>

        <div class="p-field p-grid p-mb-3">
          <label for="role" class="p-col-fixed p-pr-3">Role</label>
          <div class="p-col">
            <Dropdown id="role" v-model="role" :options="roles" optionLabel="label" class="input-box" required />
          </div>
        </div>

        <div class="p-field p-grid p-mt-2">
          <div class="p-col-fixed"></div> <!-- Spacer for alignment -->
          <div class="p-col">
            <Button label="Add User" type="submit" icon="pi pi-check" />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UserManager',
  data() {
    return {
      users: [],
      name: '',
      email: '',
      role: '',
      roles: [
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' },
      ],
    };
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get('http://localhost:8000/api/users');
        this.users = response.data;
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    async addUser() {
      try {
        const newUser = {
          name: this.name,
          email: this.email,
          role: this.role,
        };
        await axios.post('http://localhost:8000/api/users', newUser);
        this.resetForm();
        this.fetchUsers();
      } catch (error) {
        console.error('Error adding user:', error);
      }
    },
    resetForm() {
      this.name = '';
      this.email = '';
      this.role = '';
    },
  },
  mounted() {
    this.fetchUsers();
  },
};
</script>

<style scoped>
.p-field {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.p-col-fixed {
  width: 150px;
}

.p-pr-3 {
  padding-right: 1rem;
}

.input-box {
  max-width: 400px;
  width: 100%;
}

.p-col {
  display: flex;
  justify-content: flex-start;
}

button {
  width: auto;
}
</style>
