// src/keycloak.js
import Keycloak from 'keycloak-js';

// Configura tu Keycloak aquí usando variables de entorno
const keycloak = new Keycloak({
    url: import.meta.env.VITE_KEYCLOAK_URL,
    realm: import.meta.env.VITE_KEYCLOAK_REALM,
    clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID
});

let authenticated;
let store = null;

/**
 * Initializes Keycloak, then run callback. This will prompt you to login.
 *
 * @param onInitCallback
 */
async function init(onInitCallback) {
    try {
        authenticated = await keycloak.init({onLoad: "login-required", enableLogging: true, checkLoginIframe: false})
        onInitCallback()
    } catch (error) {
        console.error("Keycloak init failed")
        console.error(error)
    }
}

/**
 * Initializes store with Keycloak user data
 *
 */
async function initStore(storeInstance) {
    try {
        store = storeInstance
        store.initOauth(keycloak)

        // Show alert if user is not authenticated
        if (!authenticated) {
            alert("not authenticated")
        }
    } catch (error) {
        console.error("Keycloak init failed")
        console.error(error)
    }
};

/**
 * Logout user
 */
function logout(url) {
    keycloak.logout({redirectUri: url});
}

/**
 * Refreshes token
 */
async function refreshToken() {
    /*try {
      console.log("referscando como pendejo")
      await keycloak.updateToken(480);
      return keycloak;
    } catch (error) {
      console.error('Failed to refresh token');
      console.error(error);
    }*/
}

const KeycloakService = {
    CallInit: init,
    CallInitStore: initStore,
    CallLogout: logout,
    CallTokenRefresh: refreshToken
};

export default KeycloakService;