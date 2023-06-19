<script>
import Header from './components/Header.vue'
import TemporalRouting from './components/TemporalRouting.vue'
import Register from './pages/Register.vue'
import Login from './pages/Login.vue'
import Listing from './pages/Listing.vue'
import Info from './pages/Info.vue'
import Cart from './pages/Cart.vue'

export default {
    components: {
        Header,
        TemporalRouting,
        Register,
        Login,
        Listing,
        Info,
        Cart
    },
    data() {
        return {
            show: {
                showRegister: false,
                showLogin: false,
                showListing: false,
                showInfo: false,
                showCart: false
            }
        }
    },
    created() {
		let user = sessionStorage.getItem('user')
		if (user) {
			user = JSON.parse(user)
			this.toggleShow(user.route)
		} else {
			this.toggleShow('showLogin')
		}
	},
    methods: {
        toggleShow(component) {
			for (const show in this.show) {
				if (show === component) this.show[show] = !this.show[show]
				else this.show[show] = false
			}
            
        }
    },
    computed: {}
}
</script>

<template>
    <div >
		<Header></Header>
		<div class="main">
			<TemporalRouting :toggleShow="toggleShow"></TemporalRouting>
			<hr />
			<div v-show="show.showRegister">
				<Register @showLogin="toggleShow" @showListing="toggleShow"></Register>
				<hr />
			</div>
			<div v-show="show.showLogin">
				<Login @showRegister="toggleShow" @showListing="toggleShow"></Login>
				<hr />
			</div>
			<div v-show="show.showListing">
				<Listing></Listing>
				<hr />
			</div>
			<div v-show="show.showInfo">
				<Info></Info>
				<hr />
			</div>
			<div v-show="show.showCart">
				<Cart></Cart>
				<hr />
			</div>
		</div>
	</div>
</template>

<style scoped></style>
