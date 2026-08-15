import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import ProductsView from '../views/ProductsView.vue'
import ProductDetailsView from '../views/ProductDetailsView.vue'
import CartView from '../views/CartView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import AccountView from '../views/AccountView.vue'

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
      name: 'produto-detalhes',
      component: ProductDetailsView,
    },

    {
      path: '/carrinho',
      name: 'carrinho',
      component: CartView,
    },

    {
      path: '/sobre',
      name: 'sobre',
      component: AboutView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/cadastro',
      name: 'cadastro',
      component: RegisterView,
    },
    {
      path: '/conta',
      name: 'conta',
      component: AccountView,
    },
  ],
})

export default router