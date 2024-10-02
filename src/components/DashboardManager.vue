<template>
  <div class="p-m-3">
    <h2>Dashboard</h2>

    <div class="p-grid p-nogutter dashboard-grid">
      <!-- Latest Contracts -->
      <div class="p-col-12 p-md-6 p-lg-6">
        <Card>
          <template #header>
            <h3>Latest Contracts</h3>
          </template>
          <template #content>
            <ul v-if="latestContracts.length">
              <li v-for="contract in latestContracts" :key="contract._id">
                Property: {{ contract.property?.address }} | Tenant: {{ contract.tenant?.name }} | Rent: ${{ contract.rentAmount }}
              </li>
            </ul>
            <p v-else>No contracts available.</p>
          </template>
        </Card>
      </div>

      <!-- Latest Properties -->
      <div class="p-col-12 p-md-6 p-lg-6">
        <Card>
          <template #header>
            <h3>Latest Properties</h3>
          </template>
          <template #content>
            <ul v-if="latestProperties.length">
              <li v-for="property in latestProperties" :key="property._id">
                {{ property.address }} - {{ property.ownerName }}
              </li>
            </ul>
            <p v-else>No properties available.</p>
          </template>
        </Card>
      </div>

      <!-- Latest Tenants -->
      <div class="p-col-12 p-md-6 p-lg-6">
        <Card>
          <template #header>
            <h3>Latest Tenants</h3>
          </template>
          <template #content>
            <ul v-if="latestTenants.length">
              <li v-for="tenant in latestTenants" :key="tenant._id">
                {{ tenant.name }} - {{ tenant.email }}
              </li>
            </ul>
            <p v-else>No tenants available.</p>
          </template>
        </Card>
      </div>

      <!-- Highest Value Contracts -->
      <div class="p-col-12 p-md-6 p-lg-6">
        <Card>
          <template #header>
            <h3>Highest Value Contracts</h3>
          </template>
          <template #content>
            <ul v-if="highestValueContracts.length">
              <li v-for="contract in highestValueContracts" :key="contract._id">
                Property: {{ contract.property?.address }} | Tenant: {{ contract.tenant?.name }} | Rent: ${{ contract.rentAmount }}
              </li>
            </ul>
            <p v-else>No high-value contracts available.</p>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Card from 'primevue/card';

export default {
  name: 'DashboardManager',
  components: {
    Card,
  },
  data() {
    return {
      latestContracts: [],
      latestProperties: [],
      latestTenants: [],
      highestValueContracts: [],
      message: "Min debug" + this.highestValueContracts,
    };
  },
  methods: {
    async fetchDashboardData() {
      try {
        // Fetch latest contracts
        const contractsRes = await axios.get('http://localhost:8000/api/contracts');
        this.latestContracts = contractsRes.data.slice(-5); // Get the last 5 contracts

        // Fetch latest properties
        const propertiesRes = await axios.get('http://localhost:8000/api/properties');
        this.latestProperties = propertiesRes.data.slice(-5); // Get the last 5 properties

        // Fetch latest tenants
        const tenantsRes = await axios.get('http://localhost:8000/api/tenants');
        this.latestTenants = tenantsRes.data.slice(-5); // Get the last 5 tenants

        // Fetch highest value contracts
        this.highestValueContracts = contractsRes.data
          .sort((a, b) => b.rentAmount - a.rentAmount) // Sort by rent amount (highest first)
          .slice(0, 5); // Get the top 5 highest value contracts
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    },
  },
  mounted() {
    this.fetchDashboardData();
    console.log("Message:", this.message);
  },
};
</script>

<style scoped>
/* Style for grid layout */
.dashboard-grid {
  gap: 20px; /* Add spacing between cards */
}

.card-content {
  font-size: 0.9rem;
  line-height: 1.5;
}

/* Additional layout settings to ensure responsive 2x2 grid */
.p-col-12 {
  margin-bottom: 20px;
}
</style>
