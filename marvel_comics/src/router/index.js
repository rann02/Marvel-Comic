import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomePage.vue'
import Login from '../views/LoginPage.vue'
import Register from '../views/RegisterPage.vue'
import Detail from '../views/DetailPage.vue'
import Cart from '../views/CartPage.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: Detail
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    }
  ]
})

// GOOD
router.beforeEach((to, from, next) => {
  if (!localStorage.access_token && to.name === 'cart') {
    next('/')
  } else if (localStorage.access_token && to.name === 'login') {
    next('/')
  } else {
    next()
  }
})


export default router
