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

router.beforeEach((to, from, next) => {
    if(from.path === "/login") {
        next();
    }
    // `to` and `from` are both route objects
    // console.log("beforeEach")
    if(localStorage.getItem("token") === null) {
        // console.log("no token found!");
        if(to.path !== "/login") {
            // console.log("not on login page!")
            next("/login");
        }
        // console.log("on login page");
        next();
    }
    // console.log("token found");
    next();
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
