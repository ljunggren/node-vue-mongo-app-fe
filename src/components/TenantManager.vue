<template>
  <div class="p-m-3">
    <h2>Tenant Manager</h2>

    <!-- Data Table for Tenants -->
    <DataTable :value="tenants" responsiveLayout="scroll" class="p-mt-3">
      <Column field="name" header="Name"></Column>
      <Column field="email" header="Email"></Column>
      <Column field="phone" header="Phone"></Column>
    </DataTable>

    <!-- Add Tenant Form -->
    <div class="p-mt-4">
      <h3>Add New Tenant</h3>
      <form @submit.prevent="addTenant" class="p-fluid">
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
          <label for="phone" class="p-col-fixed p-pr-3">Phone</label>
          <div class="p-col">
            <InputText id="phone" v-model="phone" class="input-box" />
          </div>
        </div>

        <div class="p-field p-grid p-mt-2">
          <div class="p-col-fixed"></div> <!-- Spacer for alignment -->
          <div class="p-col">
            <Button label="Add Tenant" type="submit" icon="pi pi-check" />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'TenantManager',
  data() {
    return {
      tenants: [],
      name: '',
      email: '',
      phone: '',
    };
  },
  methods: {
    async fetchTenants() {
      try {
        const response = await axios.get('http://localhost:8000/api/tenants');
        this.tenants = response.data;
      } catch (error) {
        console.error('Error fetching tenants:', error);
      }
    },
    async addTenant() {
      try {
        const newTenant = {
          name: this.name,
          email: this.email,
          phone: this.phone,
        };
        await axios.post('http://localhost:8000/api/tenants', newTenant);
        this.resetForm();
        this.fetchTenants();
      } catch (error) {
        console.error('Error adding tenant:', error);
      }
    },
    resetForm() {
      this.name = '';
      this.email = '';
      this.phone = '';
    },
  },
  mounted() {
    this.fetchTenants();
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
