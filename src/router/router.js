import VueRouter from "vue-router";
import Vue from "vue";

Vue.use(VueRouter);
const routes = [
    {
        path: "/",
        component: () => import("../views/list_books.vue"),
    },
    {
        path: '/modal',
        name: 'modal',
        component: () => import('../components/Modal.vue')
    },
];
const router = new VueRouter({ mode: 'history', routes });
export default router;