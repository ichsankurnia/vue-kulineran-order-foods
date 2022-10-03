import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
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
      path: "/foods",
      name: "Foods",
      component: () => import("../views/Foods.vue"),
    },
    {
      path: "/foods/:id",
      name: "FoodDetail",
      component: () => import("../views/FoodDetail.vue"),
    },
    {
      path: "/charts",
      name: "Charts",
      component: () => import("../views/Charts.vue"),
    },{
      path: "/checkout",
      name: "OderSuccess",
      component: () => import("../views/OderSuccess.vue"),
    },
    { 
      path: '/:pathMatch(.*)*', 
      name: 'PageNotFound',
      component: () => import("../views/PageNotFound.vue"),
    },
  ],
});

export default router;
