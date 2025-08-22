import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Comp from '../views/comp.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/Comp', name: 'Comp', component: Comp }
]

export const router = createRouter({
  history: createWebHistory(), // ou createWebHashHistory()
  routes,
})