import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Cart from './views/Cart.vue'
import NewHome from './views/newHome'
import BurgerPage from './views/BurgerPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/new',
      name: 'newhome',
      component: NewHome
    },
    {
      path: '/burger',
      name: 'burger',
      component: BurgerPage
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    }
  ]
})
