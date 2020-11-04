import Vue from "vue";
// import Vuex from "vuex";
// import { createStore } from 'vuex'
import VueMq from "vue-mq";

import App from "./App.vue";
import router from "./router";
import store from "./store";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";

Vue.config.productionTip = false;
// Vue.config.devtools = true;

// Vue.prototype.db = null;

Vue.use(VueMq, {
    breakpoints: {
        small: 576,
        medium: 768,
        large: 992,
        extra: Infinity
    }
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
