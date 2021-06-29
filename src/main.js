import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueSocketIO from "vue-socket.io";
import VueDragscroll from "vue-dragscroll";
Vue.config.productionTip = false;
Vue.use(
  new VueSocketIO({
    debug: false,
    connection: process.env.VUE_APP_SOCKET_IO_HOST,
  })
);
// import VueDraggable from "vue-draggable";

Vue.use(VueDragscroll);
new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
