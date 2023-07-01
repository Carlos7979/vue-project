import { createRouter, createWebHistory } from 'vue-router'
import Login from './pages/Login.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'login',
            component: Login
        },
        {
            path: '/unauthorized',
            name: 'unauthorized',
            component: Login
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('./pages/Register.vue')
        },
        {
            path: '/listing',
            name: 'listing',
            component: () => import('./pages/Listing.vue')
        },
        {
            path: '/info/:id',
            name: 'info',
            components: {
                Info: () => import('./pages/Info.vue')
            }
        },
        {
            path: '/cart',
            name: 'cart',
            component: () => import('./pages/Cart.vue')
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'notFound',
            component: () => import('./pages/NotFound.vue')
        }
    ]
})

router.beforeEach(to => {
    const publicPages = ['/', '/register', '/unauthorized']
    const authRequired = !publicPages.includes(to.path)
    if (!sessionStorage.getItem('user') && authRequired) return '/unauthorized'
    if (sessionStorage.getItem('user') && !authRequired) return '/listing'
})

export default router
