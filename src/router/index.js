import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Operating from "../views/Operating.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/operating",
    name: "Operating",
    component: Operating,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
