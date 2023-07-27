import { createRouter, createWebHistory } from 'vue-router'
import { getFromStorage } from './utils/sessionStorage'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'login',
			component: () => import('./views/LoginVue.vue')
        },
        {
            path: '/unauthorized',
            name: 'unauthorized',
            component: () => import('./views/LoginVue.vue')
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('./views/RegisterVue.vue')
        },
        {
            path: '/listing',
            name: 'listing',
            component: () => import('./views/ListingVue.vue')
        },
        {
            path: '/info/:id',
            name: 'info',
            component: () => import('./views/InfoVue.vue')
        },
        {
            path: '/cart',
            name: 'cart',
            component: () => import('./views/CartVue.vue')
        },
		{
            path: '/orders',
            name: 'orders',
            component: () => import('./views/OrdersVue.vue')
        },
        {
            path: '/admin',
            name: 'admin',
            component: () => import('./views/AdminVue.vue')
        },
		{
			path: '/admin/product/new-product',
            name: 'new-product',
            component: () => import('./views/ManageProduct.vue')
        },
		{
			path: '/admin/product/:id',
			name: 'edit-product',
			component: () => import('./views/ManageProduct.vue')
		},
		{
            path: '/admin/orders',
            name: 'admin-orders',
            component: () => import('./views/OrdersVue.vue')
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'notFound',
            component: () => import('./views/NotFound.vue')
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
