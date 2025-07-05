import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import LoginPage from '@/presentation/pages/LoginPage.vue'
import RegisterPage from '@/presentation/pages/RegisterPage.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'Login', component: LoginPage },
  { path: '/register', name: 'Register', component: RegisterPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
