<template>
  <div class="p-m-3">
    <h2>Lease Manager</h2>

    <!-- Data Table for Leases -->
    <DataTable :value="leases" responsiveLayout="scroll" class="p-mt-3">
      <Column field="property.address" header="Property"></Column>
      <Column field="tenant.name" header="Tenant"></Column>
      <Column field="rentAmount" header="Rent ($)" />
    </DataTable>

    <!-- Add Lease Form -->
    <div class="p-mt-4">
      <h3>Add New Lease</h3>
      <form @submit.prevent="addLease" class="p-fluid">
        <div class="p-field p-grid p-mb-3">
          <label for="property" class="p-col-fixed p-pr-3">Property</label>
          <div class="p-col">
            <Dropdown id="property" v-model="propertyId" :options="properties" optionLabel="address" class="input-box" required />
          </div>
        </div>

        <div class="p-field p-grid p-mb-3">
          <label for="tenant" class="p-col-fixed p-pr-3">Tenant</label>
          <div class="p-col">
            <Dropdown id="tenant" v-model="tenantId" :options="tenants" optionLabel="name" class="input-box" required />
          </div>
        </div>

        <div class="p-field p-grid p-mb-3">
          <label for="startDate" class="p-col-fixed p-pr-3">Start Date</label>
          <div class="p-col">
            <Calendar id="startDate" v-model="startDate" dateFormat="yy-mm-dd" class="input-box" required />
          </div>
        </div>

        <div class="p-field p-grid p-mb-3">
          <label for="endDate" class="p-col-fixed p-pr-3">End Date</label>
          <div class="p-col">
            <Calendar id="endDate" v-model="endDate" dateFormat="yy-mm-dd" class="input-box" />
          </div>
        </div>

        <div class="p-field p-grid p-mb-3">
          <label for="rentAmount" class="p-col-fixed p-pr-3">Rent Amount ($)</label>
          <div class="p-col">
            <InputText id="rentAmount" v-model.number="rentAmount" class="input-box" required />
          </div>
        </div>

        <div class="p-field p-grid p-mt-2">
          <div class="p-col-fixed"></div> <!-- Spacer for alignment -->
          <div class="p-col">
            <Button label="Add Lease" type="submit" icon="pi pi-check" />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'leaseManager',
  data() {
    return {
      leases: [],
      properties: [],
      tenants: [],
      propertyId: '',
      tenantId: '',
      startDate: null,
      endDate: null,
      rentAmount: 0,
    };
  },
  methods: {
    async fetchLeases() {
      try {
        const response = await axios.get('http://localhost:8000/api/leases');
        this.leases = response.data;
      } catch (error) {
        console.error('Error fetching leases:', error);
      }
    },
    async fetchProperties() {
      try {
        const response = await axios.get('http://localhost:8000/api/properties');
        this.properties = response.data;
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    },
    async fetchTenants() {
      try {
        const response = await axios.get('http://localhost:8000/api/tenants');
        this.tenants = response.data;
      } catch (error) {
        console.error('Error fetching tenants:', error);
      }
    },
    async addLease() {
      try {
        const newLease = {
          property: this.propertyId,
          tenant: this.tenantId,
          startDate: this.startDate,
          endDate: this.endDate,
          rentAmount: this.rentAmount,
        };
        await axios.post('http://localhost:8000/api/leases', newLease);
        this.resetForm();
        this.fetchLeases();
      } catch (error) {
        console.error('Error adding lease:', error);
      }
    },
    resetForm() {
      this.propertyId = '';
      this.tenantId = '';
      this.startDate = null;
      this.endDate = null;
      this.rentAmount = 0;
    },
  },
  mounted() {
    this.fetchLeases();
    this.fetchProperties();
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
