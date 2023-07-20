import { createRouter, createWebHistory } from 'vue-router'
import { getFromStorage } from './utils/sessionStorage'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'login',
			component: () => import('./pages/Login.vue')
        },
        {
            path: '/unauthorized',
            name: 'unauthorized',
            component: () => import('./pages/Login.vue')
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
            component: () => import('./pages/Info.vue')
        },
        {
            path: '/cart',
            name: 'cart',
            component: () => import('./pages/Cart.vue')
        },
		{
            path: '/orders',
            name: 'orders',
            component: () => import('./pages/Orders.vue')
        },
        {
            path: '/admin',
            name: 'admin',
            component: () => import('./pages/Admin.vue')
        },
		{
			path: '/admin/product/new-product',
            name: 'new-product',
            component: () => import('./pages/ManageProduct.vue')
        },
		{
			path: '/admin/product/:id',
			name: 'edit-product',
			component: () => import('./pages/ManageProduct.vue')
		},
		{
            path: '/admin/orders',
            name: 'admin-orders',
            component: () => import('./pages/Orders.vue')
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
	const adminPages = ['/admin']
    const authRequired = !publicPages.includes(to.path)
	const authorizationRequired = adminPages.some(route => to.path.startsWith(route))
	const user = getFromStorage('user')
	if (authorizationRequired) {
		if (user && !user.admin) return '/listing'
	}
    if (!user && authRequired) return '/unauthorized'
    if (user && !authRequired) return '/listing'
	if (authRequired && !authorizationRequired && user.admin) return '/admin'
})

export default router
