<script>
    import CartMinusIconVue from '../components/icons/card/CartMinusIcon.vue'
    import ButtonVue from '../components/ButtonVue.vue'
    import CartPlusIcon from '../components/icons/card/CartPlusIcon.vue'
    import TrashVue from '../components/icons/card/TrashVue.vue'
    import Swal from 'sweetalert2'
    import axios from 'axios'
    import { mapGetters, mapActions } from 'vuex'

    const { VITE_FOOD_URL: foodURL, VITE_USER_URL: usersURL } = import.meta.env

    export default {
        name: 'Cart',
        components: {
            CartMinusIconVue,
            CartPlusIcon,
            TrashVue,
            ButtonVue
        },
		data() {
            return {}
        },
        methods: {
            ...mapActions('cart', ['setQuantity']),
            ...mapActions('user', ['addPurchase']),
            handleShowInfo(pid) {
                this.$router.push({ path: `/info/${pid}` })
            },
            addQuantity(data) {
                this.setQuantity(data)
            },
            removeQuantity(data) {
                if (data.quantity >= 0) this.setQuantity(data)
            },
            emptyProduct(data) {
                this.setQuantity(data)
            },
			async confirmPurchase() {
                try {
                    const swal = await Swal.fire({
                        title: 'Confirmación de compra',
                        html: `¿Confirmas la compra de <b>${this.totalProducts}</b> producto${
                            this.totalProducts > 1 ? 's' : ''
                        } por un monto total de <b>${this.totalAmount}</b>?`,
                        footer: 'Esta acción no puede revertirse',
                        icon: 'question',
                        showCloseButton: true,
                        showCancelButton: true,
                        cancelButtonText: 'Cancelar',
                        confirmButtonText: 'Comprar',
                        reverseButtons: true
                    })
                    if (swal.isConfirmed) {
                        const timestamp = Date.now()
                        const orders = [{ timestamp, products: this.cart }, ...this.orders]
                        const response = await axios.put(`${usersURL}/${this.user.id}`, {
                            orders
                        })
                        if (response.status === 200) {
                            const response = await axios.put(`${foodURL}carts/${this.user.cart}`, {
                                cart: []
                            })
                            if (response.status === 200) {
                                await Swal.fire({
                                    icon: 'success',
                                    title: `La compra se ha realizado exitosamente`,
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                                this.addPurchase(orders)
                            }
                        }
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        },
        computed: {
            ...mapGetters('product', ['getProductById']),
            ...mapGetters('cart', ['getCart']),
            ...mapGetters('user', ['getOrders', 'getUser']),
            totalProducts() {
                let total = 0
                this.cart.forEach(e => {
                    total += e.quantity
                })
                return total
            },
            totalAmount() {
                let total = 0
                this.cart.forEach(e => {
                    total += this.getProductById(e.productId)['price'] * e.quantity
                })
                return total
            },
            cart() {
                return this.getCart
            },
            orders() {
                return this.getOrders
            },
            user() {
                return this.getUser
            }
        }
    }
</script>
<template>
    <div>
        <div v-show="cart.length" class="cart">
            <ButtonVue :click="confirmPurchase" text="Confirmar compra" />
            <div class="cart-elements-header">
                <div class="cart-elements">
                    <div class="cart-element t-header">Producto</div>
                    <div class="cart-element t-header">Precio</div>
                    <div class="cart-element t-header">Cantidad</div>
                    <div class="cart-element t-header">Total</div>
                    <div class="cart-element t-header">Quitar</div>
                </div>
            </div>
            <div v-for="(product, i) of cart" :key="`${i}-product`">
                <div class="cart-elements" v-show="product.quantity > 0">
                    <div
                        @click="() => handleShowInfo(product.productId)"
                        class="cart-element route"
                    >
                        {{ getProductById(product.productId).title }}
                    </div>
                    <div class="cart-element">{{ getProductById(product.productId).price }}</div>
                    <div class="cart-element">
                        <span
                            class="click-cart"
                            @click="
                                () =>
                                    removeQuantity({
                                        quantity: product.quantity - 1,
                                        productId: product.productId
                                    })
                            "
                        >
                            <CartMinusIconVue />
                        </span>
                        <span class="quantity">{{ product.quantity }}</span>
                        <span
                            class="click-cart"
                            @click="
                                () =>
                                    addQuantity({
                                        quantity: product.quantity + 1,
                                        productId: product.productId
                                    })
                            "
                        >
                            <CartPlusIcon />
                        </span>
                    </div>
                    <div class="cart-element">
                        {{ product.quantity * getProductById(product.productId).price }}
                    </div>
                    <div
                        class="cart-element click-cart trash"
                        @click="
                            () =>
                                emptyProduct({
                                    quantity: 0,
                                    productId: product.productId
                                })
                        "
                    >
                        <TrashVue />
                    </div>
                </div>
            </div>
            <div class="cart-elements-header">
                <div class="cart-elements">
                    <div class="cart-element t-header"></div>
                    <div class="cart-element t-header"></div>
                    <div class="cart-element t-header">{{ totalProducts }}</div>
                    <div class="cart-element t-header">{{ totalAmount }}</div>
                    <div class="cart-element t-header"></div>
                </div>
            </div>
        </div>
        <div v-show="!cart.length" class="empty">El carrito de compras se encuentra vacío</div>
    </div>
</template>
<style scoped>
    .cart {
        margin: 5px auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 0 10px;
        flex-wrap: wrap;
    }

    .cart-elements-header {
        background-color: whitesmoke;
    }
    .cart-elements {
        display: flex;
        padding: 5px;
        border-top: 1px solid;
        border-bottom: 1px solid;
        width: 40rem;
        justify-content: space-between;
    }

    .cart-element {
        width: 19%;
        text-align: center;
    }

    .t-header {
        font-weight: 600;
    }

    .route:hover {
        cursor: pointer;
        color: blue;
    }

    .quantity {
        display: inline-block;
        margin: 0 3px;
        width: 3rem;
    }

    .click-cart:hover {
        cursor: pointer;
    }
    .click-cart:active {
        position: relative;
        top: 1px;
        left: 1px;
    }

    .trash {
        color: red;
    }
</style>
