import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegistView from '../views/RegistView.vue'
import CartView from '../views/CartView.vue'
import OrderView from '../views/OrderView.vue'
import GoodsView from '../views/GoodsView.vue'
import BuyView from '../views/BuyView.vue'
import UserView from '../views/UserView.vue'
import FoundView from '../views/FoundView.vue'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: LoginView,
    meta: {
      isshow: true
    }
  },
  {
    path: '/regist',
    name: 'regist',
    component: RegistView,
    meta: {
      isshow: true
    }
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartView
  },
  {
    path: '/order',
    name: 'order',
    component: OrderView
  },
  {
    path: '/goods',
    name: 'goods',
    component: GoodsView
  },
  {
    path: '/buy',
    name: 'buy',
    component: BuyView
  },
  {
    path: '/user',
    name: 'user',
    component: UserView
  },
  {
    path: '/found',
    name: 'found',
    component: FoundView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
