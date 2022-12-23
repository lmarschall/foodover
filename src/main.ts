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

    if (tokenStore.getToken() === "" && to.path !== "/login") {
        next("/login");
    } else {
        next();
    }
});

const foodover = createApp(App);
const pinia = createPinia();
foodover.use(router);
foodover.use(pinia);
foodover.mount("#app");

const tokenStore = useTokenStore();
