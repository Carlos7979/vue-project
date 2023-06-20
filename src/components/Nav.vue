<script>
export default {
	name: 'Nav',
	emits: ['showListing', 'showCart', 'showInfo', 'logout'],
    components: {},
    props: {
		show: String
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
		handleShowInfo() {
			this.$emit('showInfo', 'showInfo')
        },
		handleLogout() {
			sessionStorage.removeItem('user')
			this.$emit('logout')
		}
	}
}
</script>
<template>
    <div class="nav">
        <div id="welcome">Bienvenido(a) {{ name }}</div>
        <div class="nav-routes">
			<div class="route" v-show="show !== 'showListing'" @click="handleShowListing">Ir a productos</div>
			<div class="route" v-show="show !== 'showCart'" @click="handleShowCart">Ir a carrito</div>
			<div class="route" @click="handleLogout">Cerrar sesión</div>
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
