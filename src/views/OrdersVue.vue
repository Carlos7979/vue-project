<script>
    import axios from 'axios'
    import { getFromStorage } from '../utils/sessionStorage'
    import { mapGetters } from 'vuex'

    const usersURL = import.meta.env.VITE_USER_URL
    export default {
        name: 'Order',
        components: {},
        data() {
            return {
                usersOrders: []
            }
        },
        async mounted() {
            let isAdmin
            if (!this.isAdmin) {
                const user = getFromStorage('user')
                isAdmin = user.admin
            }
            if (this.isAdmin || isAdmin) {
				try {
					let users = await axios.get(usersURL)
                    users = users.data
                    const usersOrders = []
                    if (users.length) {
						users.forEach(user => {
							if (!user.admin) {
								user.orders.forEach(order => {
									order.user = user.user
                                    usersOrders.push(order)
                                })
                            }
                        })
                        usersOrders.sort((a, b) => {
							if (a.timestamp > b.timestamp) return -1
                            if (a.timestamp < b.timestamp) return 1
                            return 0
                        })
                        this.usersOrders = usersOrders
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        },
        methods: {
            total(order) {
                let money = 0
                let quantity = 0
                order.products.forEach(product => {
					money += this.getProductById(product.productId).price * product.quantity
                    quantity += product.quantity
                })
                return { money, quantity }
            }
        },
        computed: {
			...mapGetters('user', ['getOrders']),
			...mapGetters('user', { admin: 'isAdmin' }),
            ...mapGetters('product', ['getProductById']),
            orders() {
				if (this.isAdmin) {
					return this.usersOrders
				}
                return this.getOrders
            },
            isAdmin() {
                return this.admin
            }
        }
    }
</script>
<template>
    <div>
        <div v-show="orders.length || usersOrders.length" class="orders">
            <div class="order" v-for="(order, i) of orders" :key="`${i}-order`">
                <div class="product-elements-header">
                    <div class="product-elements">
                        <div class="product-element t-header">Nº {{ orders.length - i }}</div>
                        <div v-show="isAdmin" class="product-element t-header">
                            {{ order.user }}
                        </div>
                        <div class="product-element t-header">Fecha y hora:</div>
                        <div class="product-element t-header">
                            {{ new Date(order.timestamp).toLocaleString() }}
                        </div>
                        <div v-show="!isAdmin" class="product-element t-header"></div>
                        <div class="product-element t-header">Total: {{ total(order).money }}</div>
                    </div>
                </div>
                <div class="product-elements-header">
                    <div class="product-elements">
                        <div class="product-element t-header">Producto</div>
                        <div class="product-element t-header">Imagen</div>
                        <div class="product-element t-header">Precio</div>
                        <div class="product-element t-header">Cantidad</div>
                        <div class="product-element t-header">Sub total</div>
                    </div>
                </div>
                <div v-for="(p, i) of order.products" :key="`${i}-order`">
                    <div :class="`product-elements ${i % 2 === 1 ? 'even-line' : ''}`">
                        <div class="product-element">
                            {{ getProductById(p.productId).title }}
                        </div>
                        <div class="product-element">
                            <div class="image-container">
                                <img
                                    :src="getProductById(p.productId).img"
                                    :alt="getProductById(p.productId).title"
                                    @load="$event.target.style.opacity = 1"
                                />
                            </div>
                        </div>
                        <div class="product-element">
                            <span class="quantity">{{ getProductById(p.productId).price }}</span>
                        </div>
                        <div class="product-element">
                            <span class="quantity">{{ p.quantity }}</span>
                        </div>
                        <div class="product-element">
                            {{ getProductById(p.productId).price * p.quantity }}
                        </div>
                    </div>
                </div>
                <div class="product-elements-header">
                    <div class="product-elements">
                        <div class="product-element t-header"></div>
                        <div class="product-element t-header"></div>
                        <div class="product-element t-header"></div>
                        <div class="product-element t-header">{{ total(order).quantity }}</div>
                        <div class="product-element t-header">{{ total(order).money }}</div>
                    </div>
                </div>
            </div>
            <div v-show="!orders.length" class="empty">No hay órdenes de compra</div>
        </div>
    </div>
</template>
<style scoped>
    .orders {
        margin: 5px auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 0 10px;
        flex-wrap: wrap;
        background-color: silver;
    }

    .order {
        margin-bottom: 20px;
    }

    .product-elements-header {
        background-color: whitesmoke;
    }
    .product-elements {
        display: flex;
        padding: 5px 2%;
        border-top: 1px solid;
        border-bottom: 1px solid;
        width: 50rem;
        justify-content: space-between;
        align-items: center;
    }

    .even-line {
        background-color: rgb(205, 204, 204);
    }

    .product-element {
        width: 16%;
        display: flex;
        justify-content: center;
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

    .image-container {
        width: 50px;
        height: 50px;
        overflow: hidden;
        border-radius: 5px;
    }

    .image-container img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    img {
        opacity: 0;
        transition: opacity 1s ease-in-out;
    }

    .empty {
        margin-right: 40%;
    }
</style>
