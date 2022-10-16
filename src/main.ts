// import Vue from "vue";
// // import Vuex from "vuex";
// // import { createStore } from 'vuex'
// import VueMq from "vue-mq";

// import App from "./App.vue";
// import router from "./router";
// import store from "./store";

// import "bootstrap";
// import "bootstrap/dist/css/bootstrap.css";

// Vue.config.productionTip = false;
// // Vue.config.devtools = true;

// // Vue.prototype.db = null;

// Vue.prototype.$apiUrl = process.env.APIURL || "https://foodover.herokuapp.com"

// Vue.use(VueMq, {
//     breakpoints: {
//         small: 576,
//         medium: 768,
//         large: 992,
//         extra: Infinity
//     }
// });

// // check for each page load if token is saved and redirect to login page if not
// router.beforeEach((to, from, next) => {
//     if(from.path === "/login") {
//         next();
//     }
//     // `to` and `from` are both route objects
//     if(localStorage.getItem("token") === null) {
//         if(to.path !== "/login") {
//             next("/login");
//         }
//         next();
//     }
//     next();
// });

// new Vue({
//     router,
//     store,
//     render: h => h(App)
// }).$mount("#app");

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";

router.beforeEach((to, from, next) => {
    // fixing scroll offsets on new page
    window.scrollTo(0, 0);

    // checking if token is present and reroute to login if not
    if (from.path === "/login") {
        next();
    }
    // `to` and `from` are both route objects
    // if(TokenService.hasToken() === false) {
    //     if(from.path === "/login") {
    //         //         next();
    //         //     }
    //         //     // `to` and `from` are both route objects
    //         //     if(localStorage.getItem("token") === null) {
    //         //         if(to.path !== "/login") {
    //         //             next("/login");
    //         //         }
    //         //         next();
    //         //     }
    //         //     next();
    //     next();
    // }
    next();
});

const foodover = createApp(App);
const pinia = createPinia();
foodover.use(router);
foodover.use(pinia);
foodover.mount("#app");
