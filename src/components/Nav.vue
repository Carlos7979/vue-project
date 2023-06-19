<script>
export default {
	name: 'Nav',
	emits: ['showListing', 'showCart', 'showLogin', 'showInfo'],
    components: {},
    props: {
		show: Object
	},
    data() {
        return {
            name: ''
        }
    },
    created() {
        let user = sessionStorage.getItem('user')
        if (user) {
            user = JSON.parse(user)
            this.name = user.name
        }
    },
	methods: {
		handleShowListing() {
            this.$emit('showListing', 'showListing')
        },
		handleShowCart() {
            this.$emit('showCart', 'showCart')
        },
		handleShowLogin() {
			sessionStorage.removeItem('user')
            this.$emit('showLogin', 'showLogin')
        },
		handleShowInfo() {
            this.$emit('showInfo', 'showInfo')
        }
	}
}
</script>
<template>
    <div class="nav">
        <div id="welcome">Bienvenido(a) {{ name }}</div>
        <div class="nav-routes">
			<div class="route" v-show="!show.showListing" @click="handleShowListing">Ir a productos</div>
			<div class="route" v-show="!show.showCart" @click="handleShowCart">Ir a carrito</div>
			<div class="route" @click="handleShowLogin">Cerrar sesión</div>
			<!-- <Go route="Ir a productos"></Go>
			<Go route="Ir a carrito"></Go>
			<Go route="Cerrar sesión"></Go> -->
		</div>
    </div>
</template>
<style scoped>
.nav {
    display: flex;
    justify-content: space-between;
    border: 1px solid;
	border-radius: 5px;
	background-color: aliceblue;
	margin: 0 5px;
}

#welcome {
	padding: 5px;
	font-weight: 600;
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
