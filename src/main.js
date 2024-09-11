import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import 'bootstrap-icons/font/bootstrap-icons';
import VueCookies from 'vue-cookies'
// Import the authenticateUser.js to set up axios interceptors
import './service/AuthenticateUser.js';

const app = createApp(App);

app.use(store);
app.use(router);
app.use(VueCookies,{expires:'7d'})
// Initialize authentication state
store.dispatch('initialize');

app.mount('#app');

