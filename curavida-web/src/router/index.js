import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import ProductsView from '../views/ProductsView.vue'
import ProductDetailsView from '../views/ProductDetailsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/produtos',
      name: 'produtos',
      component: ProductsView,
    },
    {
      path: '/produtos/:slug',
      name: 'product-details',
      component: ProductDetailsView,
    },
  ],
})

export default router