<template>
  <div class="p-m-3">
    <h2>Contract Manager</h2>

    <ConfirmDialog></ConfirmDialog>
    <Toast></Toast>

    <!-- Data Table for Contracts -->
    <DataTable :value="contracts" responsiveLayout="scroll" class="p-mt-3">
      <Column field="propertyId.address" header="Property"></Column>
      <Column field="tenantId.name" header="Tenant"></Column>
      <Column field="rentAmount" header="Rent ($)"></Column>
      <!-- Actions Column -->
      <Column header="Actions" bodyStyle="text-align: center;">
        <template #body="slotProps">
          <Button
            icon="pi pi-trash"
            class="p-button-rounded p-button-danger"
            @click="confirmDeleteContract(slotProps.data)"
          />
        </template>
      </Column>
    </DataTable>

    <!-- Add Contract Form -->
    <div class="p-mt-4">
      <h3>Add New Contract</h3>
      <form @submit.prevent="addContract" class="p-fluid">
        <div class="p-field p-grid p-mb-3">
          <label for="property" class="p-col-fixed p-pr-3">Property</label>
          <div class="p-col">
            <Dropdown
              id="property"
              v-model="propertyId"
              :options="properties"
              optionLabel="address"
              optionValue="_id"
              placeholder="Select Property"
              class="input-box"
              required
            />
          </div>
        </div>

        <div class="p-field p-grid p-mb-3">
          <label for="tenant" class="p-col-fixed p-pr-3">Tenant</label>
          <div class="p-col">
            <Dropdown
              id="tenant"
              v-model="tenantId"
              :options="tenants"
              optionLabel="name"
              optionValue="_id"
              placeholder="Select Tenant"
              class="input-box"
              required
            />
          </div>
        </div>

        <div class="p-field p-grid p-mb-3">
          <label for="startDate" class="p-col-fixed p-pr-3">Start Date</label>
          <div class="p-col">
            <Calendar
              id="startDate"
              v-model="startDate"
              dateFormat="yy-mm-dd"
              class="input-box"
              required
            />
          </div>
        </div>

        <div class="p-field p-grid p-mb-3">
          <label for="endDate" class="p-col-fixed p-pr-3">End Date</label>
          <div class="p-col">
            <Calendar
              id="endDate"
              v-model="endDate"
              dateFormat="yy-mm-dd"
              class="input-box"
            />
          </div>
        </div>

        <div class="p-field p-grid p-mb-3">
          <label for="rentAmount" class="p-col-fixed p-pr-3">Rent Amount ($)</label>
          <div class="p-col">
            <InputText
              id="rentAmount"
              v-model.number="rentAmount"
              class="input-box"
              required
            />
          </div>
        </div>

        <div class="p-field p-grid p-mt-2">
          <div class="p-col-fixed"></div> <!-- Spacer for alignment -->
          <div class="p-col">
            <Button label="Add Contract" type="submit" icon="pi pi-check" />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ContractManager',
  data() {
    return {
      contracts: [],
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
    async fetchContracts() {
      try {
        const response = await axios.get('http://localhost:8000/api/contracts');
        this.contracts = response.data;
      } catch (error) {
        console.error('Error fetching contracts:', error);
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
    async addContract() {
      try {
        const newContract = {
          propertyId: this.propertyId,
          tenantId: this.tenantId,
          startDate: this.startDate,
          endDate: this.endDate,
          rentAmount: this.rentAmount,
        };
        await axios.post('http://localhost:8000/api/contracts', newContract);
        this.resetForm();
        this.fetchContracts();
        this.$toast.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Contract added',
          life: 3000,
        });
      } catch (error) {
        console.error('Error adding contract:', error);
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to add contract',
          life: 3000,
        });
      }
    },
    resetForm() {
      this.propertyId = '';
      this.tenantId = '';
      this.startDate = null;
      this.endDate = null;
      this.rentAmount = 0;
    },
    // Show confirmation dialog
    confirmDeleteContract(contract) {
      this.$confirm.require({
        message: 'Are you sure you want to delete this contract?',
        header: 'Confirm Deletion',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.deleteContract(contract);
        },
        reject: () => {
          // Optional: handle rejection
        },
      });
    },
    // Method to delete a contract
    async deleteContract(contract) {
      try {
        await axios.delete(`http://localhost:8000/api/contracts/${contract._id}`);
        this.fetchContracts();
        this.$toast.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Contract deleted',
          life: 3000,
        });
      } catch (error) {
        console.error('Error deleting contract:', error);
        const errorMessage =
          error.response?.data?.message || 'Failed to delete contract';
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
    this.fetchContracts();
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

button.p-button-icon-only {
  background: none;
  background-color: transparent;
  border: none;
  color: var(--red-600);
}
</style>
