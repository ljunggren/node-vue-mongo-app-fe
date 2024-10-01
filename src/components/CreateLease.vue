<!-- src/components/CreateLease.vue -->
<template>
  <form @submit.prevent="createLease">
    <!-- Select Unit -->
    <select v-model="unitId" required>
      <option disabled value="">Select Unit</option>
      <option v-for="unit in units" :key="unit._id" :value="unit._id">
        {{ unit.unitNumber }}
      </option>
    </select>
    <!-- Select Tenant -->
    <select v-model="tenantId" required>
      <option disabled value="">Select Tenant</option>
      <option v-for="tenant in tenants" :key="tenant._id" :value="tenant._id">
        {{ tenant.userId.firstName }} {{ tenant.userId.lastName }}
      </option>
    </select>
    <!-- Other Fields -->
    <input v-model="dateStart" type="date" required />
    <input v-model="dateEnd" type="date" />
    <input v-model="rent" type="number" required />
    <!-- File Upload for Lease Document -->
    <input type="file" @change="handleFileUpload" />
    <button type="submit">Create Lease</button>
  </form>
</template>

<script>
import apiClient from '../axios';

export default {
  data() {
    return {
      unitId: '',
      tenantId: '',
      dateStart: '',
      dateEnd: '',
      rent: '',
      leaseDocument: null,
      units: [],
      tenants: [],
    };
  },
  async created() {
    try {
      const unitsResponse = await apiClient.get('/units');
      this.units = unitsResponse.data;

      const tenantsResponse = await apiClient.get('/tenants');
      this.tenants = tenantsResponse.data;
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    handleFileUpload(event) {
      this.leaseDocument = event.target.files[0];
    },
    async createLease() {
      try {
        const formData = new FormData();
        formData.append('unitId', this.unitId);
        formData.append('tenantId', this.tenantId);
        formData.append('dateStart', this.dateStart);
        formData.append('dateEnd', this.dateEnd);
        formData.append('rent', this.rent);
        if (this.leaseDocument) {
          formData.append('leaseDocument', this.leaseDocument);
        }

        await apiClient.post('/leases', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        this.$router.push('/leases');
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
