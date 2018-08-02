import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Cart from './views/Cart.vue'
import NewHome from './views/newHome'
import BurgerPage from './views/BurgerPage'
import PaymentPage from './views/PaymentPage'

Vue.use(Router);

export default new Router({
    mode:'history',
    routes: [
        {
            path: '/old',
            name: 'home',
            component: Home
        },
        {
            path: '/',
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
        },
        {
            path: '/payment/successfull',
            component: PaymentPage,
            props: (route) => ({orderid: route.query.orderid, status: '1'})
        },
        {
            path: '/payment/error',
            component: PaymentPage,
            props: (route) => ({orderid: route.query.orderid, status: '0'})
        }
    ]
})
