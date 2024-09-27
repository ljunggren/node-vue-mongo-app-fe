<template>
  <div class="p-m-3">
    <h2>Property Manager</h2>

    <!-- Data Table for Properties -->
    <DataTable :value="properties" responsiveLayout="scroll" class="p-mt-3">
      <Column field="address" header="Address"></Column>
      <Column field="ownerName" header="Owner Name"></Column>
      <Column field="numberOfUnits" header="Units"></Column>
    </DataTable>

    <!-- Add Property Form -->
    <div class="p-mt-4">
      <h3>Add New Property</h3>
      <form @submit.prevent="addProperty" class="p-fluid">
        <div class="p-field p-grid p-mb-3">
          <label for="address" class="p-col-fixed p-pr-3">Address</label>
          <div class="p-col">
            <InputText id="address" v-model="address" class="input-box" required />
          </div>
        </div>

        <div class="p-field p-grid p-mb-3">
          <label for="ownerName" class="p-col-fixed p-pr-3">Owner Name</label>
          <div class="p-col">
            <InputText id="ownerName" v-model="ownerName" class="input-box" required />
          </div>
        </div>

        <div class="p-field p-grid p-mb-3">
          <label for="numberOfUnits" class="p-col-fixed p-pr-3">Number of Units</label>
          <div class="p-col">
            <InputText id="numberOfUnits" type="number" v-model.number="numberOfUnits" class="input-box" />
          </div>
        </div>

        <div class="p-field p-grid p-mb-3">
          <label for="description" class="p-col-fixed p-pr-3">Description</label>
          <div class="p-col">
            <InputText id="description" v-model="description" class="input-box" />
          </div>
        </div>

        <div class="p-field p-grid p-mt-2">
          <div class="p-col-fixed"></div> <!-- Spacer for alignment -->
          <div class="p-col">
            <Button label="Add Property" type="submit" icon="pi pi-check" />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'PropertyManager',
  data() {
    return {
      properties: [],
      address: '',
      ownerName: '',
      numberOfUnits: 1,
      description: '',
    };
  },
  methods: {
    async fetchProperties() {
      try {
        const response = await axios.get('http://localhost:8000/api/properties');
        this.properties = response.data;
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    },
    async addProperty() {
      try {
        const newProperty = {
          address: this.address,
          ownerName: this.ownerName,
          numberOfUnits: this.numberOfUnits,
          description: this.description,
        };
        await axios.post('http://localhost:8000/api/properties', newProperty);
        this.resetForm();
        this.fetchProperties();
      } catch (error) {
        console.error('Error adding property:', error);
      }
    },
    resetForm() {
      this.address = '';
      this.ownerName = '';
      this.numberOfUnits = 1;
      this.description = '';
    },
  },
  mounted() {
    this.fetchProperties();
  },
};
</script>

<style scoped>
/* Ensures consistent label and input alignment */
.p-field {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.p-col-fixed {
  width: 150px; /* Fixed width for labels to align vertically */
}

.p-pr-3 {
  padding-right: 1rem;
}

.input-box {
  max-width: 400px; /* Restrict input box width */
  width: 100%; /* Ensure responsiveness */
}

.p-col {
  display: flex;
  justify-content: flex-start; /* Align inputs to start of the column */
}

button {
  width: auto;
}
</style>
