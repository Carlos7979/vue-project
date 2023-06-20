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
                sessionStorage.setItem('user', JSON.stringify(user))
            }
        },
        handleInfo(data) {
            this.productIndex = data[1]
            this.handleShow(data[0])
        },
        handleProductQuantity(data) {
            console.log(data)
            const quantity = data[0]
            const productIndex = data[1]
            const cartIndex = this.cart.findIndex(e => productIndex === e.productIndex)
            if (this.cart.length === 0 || cartIndex === -1) return this.cart.push({ quantity, productIndex })
			this.cart[cartIndex].quantity = quantity
        },
        sendProductQuantity() {
            console.log(this.cart.length === 0)
            if (this.productIndex === -1 || this.cart.length === 0) return 0
            console.log('here')
            const cartIndex = this.cart.findIndex(e => this.productIndex === e.productIndex)
            console.log(cartIndex)
            if (cartIndex === -1) return 0
            return this.cart[cartIndex].quantity
        }
    },
    computed: {}
}
</script>

<template>
    <div>
        <Header></Header>
        <div class="main">
            <TemporalRouting :handleShow="handleShow"></TemporalRouting>
            <hr />
            <div v-show="!(show === 'showRegister' || show === 'showLogin')">
                <Nav
                    @showListing="handleShow"
                    @showCart="handleShow"
                    @showLogin="handleShow"
                    @showInfo="handleShow"
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
                    :cart="cart"
                    @handleQuantity="handleProductQuantity"
                ></Listing>
                <hr />
            </div>
            <div v-show="show === 'showInfo'">
                <Info
                    :product="productIndex === -1 ? {} : products[productIndex]"
                    @handleQuantity="handleProductQuantity"
                    :quantity="sendProductQuantity()"
                ></Info>
                <hr />
            </div>
            <div v-show="show === 'showCart'">
                <Cart></Cart>
                <hr />
            </div>
        </div>
    </div>
</template>

<style scoped></style>
