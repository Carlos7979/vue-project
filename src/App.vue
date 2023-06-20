<script>
import Header from './components/Header.vue'
import TemporalRouting from './components/TemporalRouting.vue'
import Nav from './components/Nav.vue'
import Register from './pages/Register.vue'
import Login from './pages/Login.vue'
import Listing from './pages/Listing.vue'
import Info from './pages/Info.vue'
import Cart from './pages/Cart.vue'

export default {
    components: {
        Header,
        TemporalRouting,
        Nav,
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
            },
            user: {},
			productIndex: null,
            products: [
                {
                    title: 'Pie de manzana',
                    img: 'https://dav-leda.github.io/images-bakery/apple-pie.jpg',
                    shortDescription:
                        'La tarta de manzana es una tarta de fruta elaborada con una masa recubierta de manzana.',
                    largeDescription:
                        'La tarta de manzana es una tarta de fruta elaborada con una masa recubierta de manzana. Existen muchas variantes, y la manzana puede ser troceada o en compota. Las manzanas pueden colocarse directamente encima de la masa o sobre una base de crema.',
                    price: 420
                },
                {
                    title: 'Brownie',
                    img: 'https://dav-leda.github.io/images-bakery/brownies.jpg',
                    shortDescription:
                        'Un brownie es un bizcocho de chocolate pequeño, típico de la gastronomía de Estados Unidos.',
                    largeDescription:
                        'Un brownie es un bizcocho de chocolate pequeño, típico de la gastronomía de Estados Unidos. Se llama así por su color marrón oscuro, o brown en inglés. A veces se cubre con jarabe espeso de chocolate y puede llevar dentro trocitos de nueces, chocolate butterscotch o mantequilla de maní.',
                    price: 250
                },
                {
                    title: 'Selva negra',
                    img: 'https://dav-leda.github.io/images-bakery/selva-negra.jpg',
                    shortDescription:
                        'La Selva Negra es uno de los dulces más característicos de la gastronomía alemana.',
                    largeDescription:
                        'La Selva Negra es uno de los dulces más característicos de la gastronomía alemana. Está compuesta por varias capas de bizcochuelo de chocolate empapado en kirsch e intercaladas con nata y cerezas.',
                    price: 900
                }
            ]
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
        },
		handleInfo(data) {
			this.productIndex = data[1]
			this.toggleShow(data[0])

		}
    },
    computed: {}
}
</script>

<template>
    <div>
        <Header></Header>
        <div class="main">
            <TemporalRouting :toggleShow="toggleShow"></TemporalRouting>
            <hr />
            <div v-show="!(show.showRegister || show.showLogin)">
                <Nav
                    @showListing="toggleShow"
                    @showCart="toggleShow"
                    @showLogin="toggleShow"
                    @showInfo="toggleShow"
                    :show="show"
                ></Nav>
            </div>
            <div v-show="show.showRegister">
                <Register @showLogin="toggleShow" @showListing="toggleShow"></Register>
                <hr />
            </div>
            <div v-show="show.showLogin">
                <Login @showRegister="toggleShow" @showListing="toggleShow"></Login>
                <hr />
            </div>
            <div v-show="show.showListing">
                <Listing @showInfo="handleInfo" :products="products"></Listing>
                <hr />
            </div>
            <div v-show="show.showInfo">
                <Info :product="products[productIndex]"></Info>
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
