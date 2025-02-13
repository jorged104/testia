import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import AuthStorePlugin from './plugins/authStore';

import keycloakService from './lib/keycloak'

import './assets/index.css'
import App from './App.vue'
import router from './router';

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate);

const renderApp = () => {
    const app = createApp(App);
    app.use(AuthStorePlugin, { pinia });
    app.use(pinia)
    app.use(router)
    app.mount('#app');
}

keycloakService.CallInit(renderApp);