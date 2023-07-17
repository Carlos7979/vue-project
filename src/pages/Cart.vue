<script>
    import Card from '../components/Card.vue'
    import CartMinusIconVue from '../components/icons/card/CartMinusIcon.vue'
    import CartPlusIcon from '../components/icons/card/CartPlusIcon.vue'
    import Trash from '../components/icons/card/Trash.vue'
    import { productInfo } from '../mixins/productInfo'

    export default {
        name: 'Cart',
        components: {
            Card,
            CartMinusIconVue,
            CartPlusIcon,
            Trash
        },
        mixins: [productInfo],
        data() {
            return {}
        },
        methods: {
            handleShowInfo(pid) {
                this.$router.push({ path: `/info/${pid}` })
            },
            addQuantity(data) {
				this.$store.dispatch('setQuantity', data)
            },
            removeQuantity(data) {
                if (data.quantity >= 0)
                    this.$store.dispatch('setQuantity', data)
            },
            emptyProduct(data) {
				this.$store.dispatch('setQuantity', data)
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
            },
            products() {
                return this.$store.getters.getProducts
            },
            cart() {
                return this.$store.getters.getCart
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
                        @click="() => handleShowInfo(product.productId)"
                        class="cart-element route"
                    >
                        {{ sendProduct(product.productId).title }}
                    </div>
                    <div class="cart-element">{{ products[i].price }}</div>
                    <div class="cart-element">
                        <span
                            class="click-cart"
                            @click="() => removeQuantity({
                                        quantity: product.quantity - 1,
                                        productId: product.productId
                                    })"
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
                        {{ product.quantity * products[i].price }}
                    </div>
                    <div
                        class="cart-element click-cart trash"
                        @click="() => emptyProduct({
                                        quantity: 0,
                                        productId: product.productId
                                    })"
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
