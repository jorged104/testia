import { useAuthStore } from "@/stores/authStore.ts";
import keycloakService from '@/lib/keycloak';
import setupInterceptors from '@/lib/services/tokenInterceptors';

// Setup auth store as a plugin so it can be accessed globally in our FE
const authStorePlugin = {
  install(app, option) {
    const store = useAuthStore(option.pinia);

    // Global store
    app.config.globalProperties.$store = store;

    // Store keycloak user data into store
    keycloakService.CallInitStore(store);
    setupInterceptors(store);
  }
}

export default authStorePlugin;