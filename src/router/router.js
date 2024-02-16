import VueRouter from "vue-router";
import Vue from "vue";

Vue.use(VueRouter);
const routes = [
    {
        path: "/",
        component: () => import("../views/list_books.vue"),
    },
    {
        path: '/card',
        name: 'card',
        component: () => import('../components/Card.vue')
    },
];
const router = new VueRouter({ mode: 'history', routes });
export default router;