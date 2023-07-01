<script>
    import Header from './components/Header.vue'
    import Nav from './components/Nav.vue'
    import { productInfo } from './mixins/productInfo'
    import axios from 'axios'
	import { getFromStorage, saveInStorage } from './utils/sessionStorage'

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
                userId: '',
                name: '',
                cartId: '',
                cart: [],
                fav: [],
                productId: '',
                products: [],
                foodURL: 'https://649fd22fed3c41bdd7a6bb8d.mockapi.io/api/food',
                usersURL: 'https://649fbf32ed3c41bdd7a6a1d1.mockapi.io/api/food/users'
            }
        },
        async created() {
            const user = getFromStorage('user')
            if (user) {
                if (!this.products.length) await this.getProducts()
                if (user.hasOwnProperty('productId')) this.productId = user.productId
                try {
                    if (user.cart) {
                        await this.getCart(user.cart)
                    }
                    if (user.fav) this.fav = user.fav
					if (this.show !== 'showNotFound') this.handleShow(user.route)
                    this.name = user.name
                } catch (error) {
                    console.log(error)
                }
            } else {
                this.handleShow('showLogin')
            }
        },
        methods: {
            handleShow(component) {
                if (component === 'showListing' && this.productId !== '') this.productId = ''
                this.show = component
                const user = getFromStorage('user')
                if (user && component !== 'showLogin' && component !== 'showRegister') {
                    if (component !== 'showNotFound') user.route = component
                    user.productId = this.productId
                    if (user.fav) this.fav = user.fav
                    else user.fav = this.fav
                    saveInStorage('user', user)
                }
            },
            handleInfo(data) {
                this.productId = data[1]
                this.handleShow(data[0])
            },
            async handleProductQuantity(data) {
                const quantity = data[0]
                const productId = data[1]
                const cartIndex = this.cart.findIndex(e => productId === e.productId)
                if (this.cart.length === 0 || cartIndex === -1)
                    this.cart.push({ quantity, productId })
                else if (quantity === 0) this.cart.splice(cartIndex, 1)
                else this.cart[cartIndex].quantity = quantity
                try {
                    await axios.put(`${this.foodURL}carts/${this.cartId}`, { cart: this.cart })
                } catch (error) {
                    console.log(error)
                }
            },
            async handleProductFav(data) {
                const fav = data[0]
                const productId = data[1]
                if (fav) this.fav.push(productId)
                else {
                    const favIndex = this.fav.findIndex(e => productId === e)
                    this.fav.splice(favIndex, 1)
                }
                const user = getFromStorage('user')
                if (user) {
                    try {
                        await axios.put(`${this.usersURL}/${user.id}`, { fav: this.fav })
                        user.fav = this.fav
                        saveInStorage('user', user)
                    } catch (error) {
                        console.log(error)
                    }
                }
            },
            async handleLogin(user) {
                if (!this.products.length) await this.getProducts()
                if (!this.cart.length) await this.getCart(user.cart)
                this.name = user.name
                this.userId = user.id
                this.cartId = user.cart
                this.productId = user.productId
            },
            handleLogout() {
                this.handleShow('showLogin')
                this.cart = []
                this.fav = []
                this.isLogged = false
                this.name = ''
            },
            async getProducts() {
                const products = await axios.get(`${this.foodURL}/products`)
                if (products.data.length) this.products = products.data
            },
            async getCart(cartId) {
                const cart = await axios.get(`${this.foodURL}/carts/${cartId}`)
                if (cart.data.cart.length) this.cart = cart.data.cart
            }
        },
        computed: {
            productQuantity() {
                return this.sendQuantity(this.productId)
            },
            isFav() {
                return this.sendIsFav(this.productId)
            },
            product() {
                return this.sendProduct(this.productId)
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
                :usersURL="usersURL"
                :foodURL="foodURL"
				@notFound="handleShow"
            />
            <RouterView
                name="Info"
                :product="productId === '' ? {} : product"
                :fav="isFav"
                @handleQuantity="handleProductQuantity"
                @handleFav="handleProductFav"
                :quantity="productQuantity"
            />
        </div>
    </div>
</template>

<style scoped></style>
