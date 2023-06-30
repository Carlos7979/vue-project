<script>
    import Header from './components/Header.vue'
    import Nav from './components/Nav.vue'
    import { productInfo } from './mixins/productInfo'

    export default {
        components: {
            Header,
            Nav
        },
        mixins: [productInfo],
        data() {
            return {
                show: 'showLogin',
                isLogged: false,
				name: '',
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
                if (user.cart) this.cart = user.cart
                if (user.fav) this.fav = user.fav
                this.handleShow(user.route)
				this.name = user.name
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
                    if (user.cart) this.cart = user.cart
                    else user.cart = this.cart
                    if (user.fav) this.fav = user.fav
                    else user.fav = this.fav
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
			handleLogin(name) {
				this.name = name
			},
            handleLogout() {
                this.handleShow('showLogin')
                this.cart = []
                this.fav = []
				this.isLogged = false,
				this.name = ''
            }
        },
        computed: {
            productQuantity() {
                return this.sendQuantity(this.productIndex)
            },
            isFav() {
                return this.sendIsFav(this.productIndex)
            }
        }
    }
</script>

<template>
    <div>
        <Header></Header>
        <div class="main">
            <div v-show="name">
                <Nav
                    @showListing="handleShow"
                    @showCart="handleShow"
                    @showLogin="handleShow"
                    @showInfo="handleShow"
					@logged="handleLogin"
                    @logout="handleLogout"
                    :show="show"
					:name="name"
                ></Nav>
            </div>
			<RouterView
                @showInfo="handleInfo"
                :products="products"
                :cart="cart"
                @handleQuantity="handleProductQuantity"
				@logged="handleLogin"
                :fav="fav"
                @handleFav="handleProductFav" 
            />
            <RouterView
                name="Info"
                :product="productIndex === -1 ? {} : products[productIndex]"
                :fav="isFav"
                @handleQuantity="handleProductQuantity"
                @handleFav="handleProductFav"
                :quantity="productQuantity"
            />
        </div>
    </div>
</template>

<style scoped></style>
