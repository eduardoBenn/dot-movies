import AppHome from '@/components/AppHome.vue'
import Favorites from '@/views/FavoritesView.vue'
import Shopping from '@/views/ShoppingView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: AppHome,
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: Favorites,
    },
    {
      path: '/shopping',
      name: 'shopping',
      component: Shopping,
    },
  ],
})

export default router
