import { createRouter, createWebHistory } from "vue-router"
import HomeView from "../views/HomeView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView
    },
    {
      path: "/inprogress",
      name: "inprogress",
      component: () => import("../views/inprogressView.vue")
    },
    {
      path: "/completed",
      name: "completed",
      component: () => import("../views/completedView.vue")
    }
  ]
})

export default router
