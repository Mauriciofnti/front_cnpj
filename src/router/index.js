import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Empresas from '../views/Empresas.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/Empresas', name: 'Empresas', component: Empresas }
]

export const router = createRouter({
  history: createWebHistory(), // ou createWebHashHistory()
  routes,
})