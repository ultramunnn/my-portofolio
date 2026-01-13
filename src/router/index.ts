import { createRouter, createWebHistory } from 'vue-router'
import Certificate from '@/pages/Certificate.vue'
import Home from '@/pages/Index.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/certificate', name: 'Certificate', component: Certificate },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth', top: 82 }
    }
    return { top: 0 }
  },
})

export default router
