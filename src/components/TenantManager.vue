<template>
  <div class="p-m-3">
    <h2>Tenant Manager</h2>

    <ConfirmDialog></ConfirmDialog>
    <Toast></Toast>
    
    <!-- Data Table for Tenants -->
    <DataTable :value="tenants" responsiveLayout="scroll" class="p-mt-3">
      <Column field="name" header="Name"></Column>
      <Column field="email" header="Email"></Column>
      <Column field="phone" header="Phone"></Column>
       <Column header="Actions" bodyStyle="text-align: center;">
        <template #body="slotProps">
          <Button
            icon="pi pi-trash"
            class="p-button-rounded p-button-danger"
            @click="confirmDeleteTenant(slotProps.data)"
          />
        </template>
      </Column>
      
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
    // Show confirmation dialog
    confirmDeleteTenant(tenant) {
      this.$confirm.require({
        message: 'Are you sure you want to delete this entry?',
        header: 'Confirm Deletion',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.deleteTenant(tenant);
        },
        reject: () => {
          // Optional: handle rejection
        },
      });
    },
    // New method to delete a tenant
    async deleteTenant(tenant) {
      try {
        await axios.delete(`http://localhost:8000/api/tenants/${tenant._id}`);
        this.fetchTenants();
        this.$toast.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Tenant deleted',
          life: 3000,
        });
      } catch (error) {
        console.error('Error deleting tenant:', error);
        const errorMessage = error.response?.data?.message || 'Failed to delete tenant';
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: errorMessage,
          life: 3000,
        });
      }
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

button.p-button-icon-only{
  background: none;
  background-color:transparent;
  border: none;
  color: var(--red-600);
}
</style>
