<script>
import Header from './components/Header.vue'
import TemporalRouting from './components/TemporalRouting.vue'
import Nav from './components/Nav.vue'
const pages = await import('./pages')

export default {
    components: {
        Header,
        TemporalRouting,
        Nav,
        ...pages
    },
    data() {
        return {
            show: 'showLogin',
            cart: [],
			fav: [],
            productIndex: -1,
            products: [
                {
                    title: 'Pie de manzana',
                    img: 'https://dav-leda.github.io/images-bakery/apple-pie.jpg',
                    shortDescription:
                        'La tarta de manzana es una tarta de fruta elaborada con una masa recubierta de manzana.',
                    largeDescription:
                        'La tarta de manzana es una tarta de fruta elaborada con una masa recubierta de manzana. Existen muchas variantes, y la manzana puede ser troceada o en compota. Las manzanas pueden colocarse directamente encima de la masa o sobre una base de crema.',
                    price: 420,
                    id: 1
                },
                {
                    title: 'Brownie',
                    img: 'https://dav-leda.github.io/images-bakery/brownies.jpg',
                    shortDescription:
                        'Un brownie es un bizcocho de chocolate pequeño, típico de la gastronomía de Estados Unidos.',
                    largeDescription:
                        'Un brownie es un bizcocho de chocolate pequeño, típico de la gastronomía de Estados Unidos. Se llama así por su color marrón oscuro, o brown en inglés. A veces se cubre con jarabe espeso de chocolate y puede llevar dentro trocitos de nueces, chocolate butterscotch o mantequilla de maní.',
                    price: 250,
                    id: 2
                },
                {
                    title: 'Selva negra',
                    img: 'https://dav-leda.github.io/images-bakery/selva-negra.jpg',
                    shortDescription:
                        'La Selva Negra es uno de los dulces más característicos de la gastronomía alemana.',
                    largeDescription:
                        'La Selva Negra es uno de los dulces más característicos de la gastronomía alemana. Está compuesta por varias capas de bizcochuelo de chocolate empapado en kirsch e intercaladas con nata y cerezas.',
                    price: 900,
                    id: 3
                }
            ]
        }
    },
    created() {
        let user = sessionStorage.getItem('user')
        if (user) {
            user = JSON.parse(user)
            if (user.hasOwnProperty('productIndex')) this.productIndex = user.productIndex
            if (user.hasOwnProperty('cart')) this.cart = user.cart
			if (user.hasOwnProperty('fav')) this.fav = user.fav
            this.handleShow(user.route)
        } else {
            this.handleShow('showLogin')
        }
    },
    methods: {
        handleShow(component) {
            if (component === 'showListing' && this.productIndex > 0) this.productIndex = -1
            this.show = component
            let user = sessionStorage.getItem('user')
            if (user && component !== 'showLogin' && component !== 'showRegister') {
                user = JSON.parse(user)
                user.route = component
                user.productIndex = this.productIndex
                user.cart = this.cart
                sessionStorage.setItem('user', JSON.stringify(user))
            }
        },
        handleInfo(data) {
            this.productIndex = data[1]
            this.handleShow(data[0])
        },
        handleProductQuantity(data) {
            const quantity = data[0]
            const productIndex = data[1]
            const cartIndex = this.cart.findIndex(e => productIndex === e.productIndex)
            if (this.cart.length === 0 || cartIndex === -1)
                this.cart.push({ quantity, productIndex })
            else if (quantity === 0) this.cart.splice(cartIndex, 1)
			else this.cart[cartIndex].quantity = quantity
            let user = sessionStorage.getItem('user')
            if (user) {
                user = JSON.parse(user)
                user.cart = this.cart
                sessionStorage.setItem('user', JSON.stringify(user))
            }
        },
		handleProductFav(data) {
            const fav = data[0]
			const productIndex = data[1]
			if (fav) this.fav.push(productIndex)
			else {
				const favIndex = this.fav.findIndex(e => productIndex === e)
				this.fav.splice(favIndex, 1)
			}
            let user = sessionStorage.getItem('user')
            if (user) {
                user = JSON.parse(user)
                user.fav = this.fav
                sessionStorage.setItem('user', JSON.stringify(user))
            }
        },
		handleLogout() {
			this.handleShow('showLogin')
			this.cart = []
			this.fav= []
		}
    },
    computed: {
		productQuantity() {
            if (this.productIndex === -1 || this.cart.length === 0) return 0
            const cartIndex = this.cart.findIndex(e => this.productIndex === e.productIndex)
            if (cartIndex === -1) return 0
            return this.cart[cartIndex].quantity
        },
		isFav() {
			if (this.fav.includes(this.productIndex)) return true
			return false
		}
	}
}
</script>

<template>
    <div>
        <Header></Header>
        <div class="main">
            <!-- <TemporalRouting :handleShow="handleShow"></TemporalRouting> -->
            <hr />
            <div v-show="!(show === 'showRegister' || show === 'showLogin')">
                <Nav
                    @showListing="handleShow"
                    @showCart="handleShow"
                    @showLogin="handleShow"
                    @showInfo="handleShow"
					@logout="handleLogout"
                    :show="show"
                ></Nav>
            </div>
            <div v-show="show === 'showRegister'">
                <Register @showLogin="handleShow" @showListing="handleShow"></Register>
                <hr />
            </div>
            <div v-show="show === 'showLogin'">
                <Login @showRegister="handleShow" @showListing="handleShow"></Login>
                <hr />
            </div>
            <div v-show="show === 'showListing'">
                <Listing
                    @showInfo="handleInfo"
                    :products="products"
                    :fav="fav"
					:cart="cart"
                    @handleQuantity="handleProductQuantity"
					@handleFav="handleProductFav"
                ></Listing>
                <hr />
            </div>
            <div v-show="show === 'showInfo'">
                <Info
                    :product="productIndex === -1 ? {} : products[productIndex]"
                    :fav="isFav"
					@handleQuantity="handleProductQuantity"
					@handleFav="handleProductFav"
                    :quantity="productQuantity"
                ></Info>
                <hr />
            </div>
            <div v-show="show === 'showCart'">
                <Cart
                    @showInfo="handleInfo"
                    :products="products"
                    :cart="cart"
                    @handleQuantity="handleProductQuantity"
                ></Cart>
                <hr />
            </div>
        </div>
    </div>
</template>

<style scoped></style>
