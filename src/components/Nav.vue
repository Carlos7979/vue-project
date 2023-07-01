<script>
    import { getFromStorage } from '../utils/sessionStorage'

    export default {
        name: 'Nav',
        emits: ['showListing', 'showCart', 'showInfo', 'logout', 'logged'],
        components: {},
        props: {
            show: String,
            name: String
        },
        data() {
            return {
                title: {
                    showListing: 'Productos',
                    showInfo: 'Detalle del producto',
                    showCart: 'Carrito de compras',
                    showNotFound: 'Página no encontrada'
                }
            }
        },
        created() {
            const user = getFromStorage('user')
            if (user) {
                this.$emit('logged', user)
            }
        },
        methods: {
            handleShowListing() {
                this.$emit('showListing', 'showListing')
                this.$router.push({ path: '/listing' })
            },
            handleShowCart() {
                this.$emit('showCart', 'showCart')
                this.$router.push({ path: '/cart' })
            },
            handleLogout() {
                sessionStorage.removeItem('user')
                this.$emit('logout')
                this.$router.push({ path: '/' })
            }
        }
    }
</script>
<template>
    <div class="nav">
        <div id="welcome" :class="show === 'showInfo' && 'welcome'">Bienvenido(a) {{ name }}</div>
        <h4 class="title">{{ title[show] }}</h4>
        <div class="nav-routes">
            <div class="route" v-show="show !== 'showListing'" @click="handleShowListing">
                Ir a productos
            </div>
            <div class="route" v-show="show !== 'showCart'" @click="handleShowCart">
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
