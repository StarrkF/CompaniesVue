import { createRouter, createWebHistory } from 'vue-router'
import Company from '../views/Company.vue'
import '../assets/style.css'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/company',
      name: 'company',
      component: Company
    },
    {
      path: '/project/:company_id?',
      name: 'project',
      component: () => import('../views/Project.vue')
    }
  ]
})

export default router