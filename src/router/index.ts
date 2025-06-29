import AppHome from '@/components/AppHome.vue'
import Favorites from '@/views/FavoritesView.vue'
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
  ],
})

export default router
