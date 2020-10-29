import Vue from "vue";
import VueMq from 'vue-mq'

import App from "./App.vue";
import router from "./router";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";

Vue.config.productionTip = false;
Vue.config.devtools = true;

Vue.prototype.db = null;

Vue.use(VueMq, {
    breakpoints: {
      sm: 576,
      md: 768,
      lg: 992,
      xl: Infinity
    }
})

new Vue({
    render: h => h(App),
    router
}).$mount("#app");
