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
import Password from 'primevue/password';
import Message from 'primevue/message';
import Card from 'primevue/card';

// Confirm dialog
import ConfirmDialog from 'primevue/confirmdialog';
import ConfirmationService from 'primevue/confirmationservice';

// ToastService
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';

const app = createApp(App);
app.use(router);
app.use(PrimeVue);
app.use(ConfirmationService);
app.use(ToastService);

app.use(store);

// Register PrimeVue components globally
app.component('Button', Button);
app.component('InputText', InputText);
app.component('Dropdown', Dropdown);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('Dialog', Dialog);
app.component('Calendar', Calendar);
app.component('Password', Password);
app.component('Message', Message);
app.component('Card', Card);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('ConfirmDialog', ConfirmDialog);
app.component('Toast', Toast);


app.mount('#app');