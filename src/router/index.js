import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/order/HomeView.vue";
import TheWelcome from "../components/TheWelcome.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/dashboard",
      redirect: "/dashboard/welcome",
      component: () => import("../layouts/DashboardLayout.vue"),
      children: [
        {
          path: "/dashboard/welcome",
          component: TheWelcome,
        },
        {
          path: ":pathMatch(.*)*",
          component: () => import("../views/PageNotFound.vue"),
        },
      ]
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/",
      component: () => import("../layouts/OrderLayout.vue"),
      children: [
        {
          path: "/",
          name: "Home",
          component: HomeView,
        },
        {
          path: "/foods",
          name: "Foods",
          component: () => import("../views/order/Foods.vue"),
        },
        {
          path: "/foods/:id",
          name: "FoodDetail",
          component: () => import("../views/order/FoodDetail.vue"),
        },
        {
          path: "/charts",
          name: "Charts",
          component: () => import("../views/order/Charts.vue"),
        },
        {
          path: "/checkout",
          name: "SuccessOrder",
          component: () => import("../views/order/SuccessOrder.vue"),
        },
        { 
          path: ':pathMatch(.*)*', 
          name: 'PageNotFound',
          component: () => import("../views/PageNotFound.vue"),
        },
      ]
    },
    { 
      path: '/:pathMatch(.*)*', 
      name: 'PageNotFound',
      component: () => import("../views/PageNotFound.vue"),
    },
  ],
});

export default router;
