import { createRouter, createWebHistory } from 'vue-router'
import homeView from '@/views/homeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: homeView
    },
    {
      path: '/inprogress',
      name: 'inprogress',
      component: () => import('@/views/inprogressView.vue')
    },
    {
      path: '/completed',
      name: 'completed',
      component: () => import('@/views/completedView.vue')
    }
  ]
})

export default router

// import { useTaskStore } from '@/stores/counter.js'

// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes: [
//     //略
//     {
//       path: '/',
//       name: 'home',
//       component: () => import('@/views/homeView.vue'),
//       async beforeEnter(to, from) {
//         const taskStore = useTaskStore()
//         await taskStore.fetchTasks()
//       }
//     }
//   ]
// })
// export default router
