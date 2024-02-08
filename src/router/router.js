import VueRouter from "vue-router";
import Vue from "vue";

Vue.use(VueRouter);
const routes = [
<<<<<<< HEAD
    {
        path: "/",
        component: () => import("../views/list_books.vue"),
    }
];
const router = new VueRouter({ routes });
export default router;
=======
  {
    path: "/",
    component: () => import("../views/list_books.vue"),
  },
];
const router = new VueRouter({ routes });
export default router;
>>>>>>> e3977c16a31ca69ccceed8aa2e936d83de739a61
