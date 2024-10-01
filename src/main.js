import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';


// PrimeVue imports
import PrimeVue from 'primevue/config';
import 'primevue/resources/primevue.min.css';                // Core PrimeVue styles
import 'primevue/resources/themes/lara-light-blue/theme.css'; // Theme
import 'primeicons/primeicons.css';                           // PrimeIcons
import 'primeflex/primeflex.css';                             // PrimeFlex grid system

// PrimeVue components
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dialog from 'primevue/dialog';
import Calendar from 'primevue/calendar';

const app = createApp(App);
app.use(router);
app.use(PrimeVue);
app.use(store);

// Register PrimeVue components globally
app.component('Button', Button);
app.component('InputText', InputText);
app.component('Dropdown', Dropdown);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('Dialog', Dialog);
app.component('Calendar', Calendar);

app.mount('#app');