<script>
    import { getFromStorage } from '../utils/sessionStorage'
    const title = {
        listing: 'Productos',
        info: 'Detalle del producto',
        cart: 'Carrito de compras',
        notFound: 'Página no encontrada',
        admin: 'Gestionar productos',
        'new-product': 'Agregar producto',
        'edit-product': 'Editar producto',
        orders: 'Mis órdenes',
		'admin-orders': 'Órdenes recibidas'
    }
    export default {
        name: 'Nav',
        emits: ['logout', 'logged'],
        components: {},
        props: {
            name: String
        },
        data() {
            return {}
        },
        created() {
            this.title = title
            const user = getFromStorage('user')
            if (user) {
                this.$store.dispatch('isLogged', user)
            }
        },
        methods: {
            handleRoute(path) {
                this.$router.push({ path })
            },
            handleLogout() {
                sessionStorage.removeItem('user')
                this.$store.dispatch('logout')
                this.$router.push({ path: '/' })
            }
        },
        computed: {
            isAdmin() {
                return this.$store.getters.isAdmin
            }
        }
    }
</script>
<template>
    <div class="nav">
        <div id="welcome">Bienvenido(a) {{ name }}</div>
        <h4 class="title">{{ title[$route.name] }}</h4>
        <div class="nav-routes">
            <div
                class="route"
                v-show="$route.name !== 'admin-orders' && isAdmin"
                @click="() => handleRoute('/admin/orders')"
            >
                Órdenes
            </div>
            <div
                class="route"
                v-show="$route.name !== 'admin' && isAdmin"
                @click="() => handleRoute('/admin')"
            >
                Gestionar productos
            </div>
            <div
                class="route"
                v-show="$route.name !== 'listing' && !isAdmin"
                @click="() => handleRoute('/listing')"
            >
                Ir a productos
            </div>
			<div
                class="route"
                v-show="$route.name !== 'orders' && !isAdmin"
                @click="() => handleRoute('/orders')"
            >
                Mis órdenes
            </div>
            <div class="route" v-show="$route.name !== 'cart' && !isAdmin" @click="() => handleRoute('/cart')">
                Ir a carrito
            </div>
            <div class="route" @click="handleLogout">Cerrar sesión</div>
        </div>
    </div>
</template>
<style scoped>
    .nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: 1px solid;
        border-radius: 5px;
        background-color: aliceblue;
        margin: 0 5px;
		padding-left: 5px;
    }

    #welcome {
        padding: 5px;
        font-weight: 600;
		width: 32%;
    }

    .title {
        margin-bottom: 0;
		width: 32%;
		text-align: center;
		border-radius: 7px;
		background-color: rgb(238, 236, 236);
    }

    .nav-routes {
        display: flex;
        margin-right: 20px;
        padding: 5px;
        width: 32%;
        justify-content: end;
    }

    .route {
        margin: 0 20px;
    }

    .route:hover {
        cursor: pointer;
        color: blue;
    }

    .route:active {
        position: relative;
        top: 1px;
        left: 1px;
    }
</style>
