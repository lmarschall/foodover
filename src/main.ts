import { createApp } from "vue";
import { createPinia } from "pinia";
import { useTokenStore } from "./stores/token";

import App from "./App.vue";
import router from "./router";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";

router.beforeEach((to, from, next) => {
    // fixing scroll offsets on new page
    window.scrollTo(0, 0);

    // // checking if token is present and reroute to login if not
    if (from.path === "/login") {
        next();
    }
    // `to` and `from` are both route objects
    if (tokenStore.getToken() === "") {
        if (from.path === "/login") {
            next();
        }
        // `to` and `from` are both route objects
        if (tokenStore.getToken() === "") {
            if (to.path !== "/login") {
                next("/login");
            }
            next();
        }
        next();
    }
    next();
});

const foodover = createApp(App);
const pinia = createPinia();
foodover.use(router);
foodover.use(pinia);
foodover.mount("#app");

const tokenStore = useTokenStore();
