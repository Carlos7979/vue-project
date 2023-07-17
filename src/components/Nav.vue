<script>
    import { getFromStorage } from '../utils/sessionStorage'
    const title = {
        listing: 'Productos',
        info: 'Detalle del producto',
        cart: 'Carrito de compras',
        notFound: 'Página no encontrada'
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
            handleShowListing() {
                this.$router.push({ path: '/listing' })
            },
            handleShowCart() {
                this.$router.push({ path: '/cart' })
            },
            handleLogout() {
                sessionStorage.removeItem('user')
                this.$store.dispatch('logout')
                this.$router.push({ path: '/' })
            }
        }
    }
</script>
<template>
    <div class="nav">
        <div id="welcome" :class="$route.name === 'info' && 'welcome'">
            Bienvenido(a) {{ name }}
        </div>
        <h4 class="title">{{ title[$route.name] }}</h4>
        <div class="nav-routes">
            <div class="route" v-show="$route.name !== 'listing'" @click="handleShowListing">
                Ir a productos
            </div>
            <div class="route" v-show="$route.name !== 'cart'" @click="handleShowCart">
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
    }

    #welcome {
        padding: 5px;
        font-weight: 600;
    }

    .welcome {
        width: 30%;
    }

    .title {
        margin-bottom: 0;
    }

    .nav-routes {
        display: flex;
        margin-right: 20px;
        padding: 5px;
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
