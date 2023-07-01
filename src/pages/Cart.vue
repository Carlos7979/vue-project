<script>
    import Card from '../components/Card.vue'
    import CartMinusIconVue from '../components/icons/card/CartMinusIcon.vue'
    import CartPlusIcon from '../components/icons/card/CartPlusIcon.vue'
    import Trash from '../components/icons/card/Trash.vue'
    import { productInfo } from '../mixins/productInfo'

    export default {
        name: 'Cart',
        emits: ['showInfo', 'handleQuantity'],
        components: {
            Card,
            CartMinusIconVue,
            CartPlusIcon,
            Trash
        },
        mixins: [productInfo],
        props: {
            products: Array,
            cart: Array
        },
        data() {
            return {}
        },
        methods: {
            handleShowInfo(data) {
                this.$emit('showInfo', data)
                this.$router.push({ path: `/info/${data[1] + 1}` })
            },
            sendQuantity(index) {
                if (this.cart.length === 0) return 0
                const cartIndex = this.cart.findIndex(e => index === e.productId)
                if (cartIndex === -1) return 0
                return this.cart[cartIndex].quantity
            },
            handleQuantity(data) {
                this.$emit('handleQuantity', data)
            }
        },
        computed: {
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
                    total += this.sendProduct(e.productId)['price'] * e.quantity
                })
                return total
            }
        }
    }
</script>
<template>
    <div>
        <div v-show="cart.length" class="cart">
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
                        @click="() => handleShowInfo(['showInfo', product.productId])"
                        class="cart-element route"
                    >
                        {{ sendProduct(product.productId).title }}
                    </div>
                    <div class="cart-element">{{ products[i].price }}</div>
                    <div class="cart-element">
                        <span
                            class="click-cart"
                            @click="() => handleQuantity([product.quantity - 1, product.productId])"
                        >
                            <CartMinusIconVue />
                        </span>
                        <span class="quantity">{{ product.quantity }}</span>
                        <span
                            class="click-cart"
                            @click="() => handleQuantity([product.quantity + 1, product.productId])"
                        >
                            <CartPlusIcon />
                        </span>
                    </div>
                    <div class="cart-element">
                        {{ product.quantity * products[i].price }}
                    </div>
                    <div
                        class="cart-element click-cart trash"
                        @click="() => handleQuantity([0, product.productId])"
                    >
                        <Trash />
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
