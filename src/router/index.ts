import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import LoginPage from '@/presentation/pages/LoginPage.vue'
import RegisterPage from '@/presentation/pages/RegisterPage.vue'
import DashboardPage from '@/presentation/pages/DashboardPage.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'Login', component: LoginPage },
  { path: '/register', name: 'Register', component: RegisterPage },
  { path: '/dashboard', name: 'Dashboard', component: DashboardPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

  const isAuthenticated = !!token
  const isPublic = to.path === '/' || to.path === '/register'

  if (isAuthenticated && isPublic) {
    next('/dashboard')
  } else if (!isAuthenticated && !isPublic) {
    next('/')
  } else {
    next()
  }
})


export default router
