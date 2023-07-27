<script>
    import TrashVue from '../components/icons/card/TrashVue.vue'
    import EditVue from '../components/icons/admin/EditVue.vue'
	import ButtonVue from '../components/ButtonVue.vue'
    import Swal from 'sweetalert2'
    import axios from 'axios'
	import { mapGetters, mapActions } from 'vuex'

    const foodURL = import.meta.env.VITE_FOOD_URL

    export default {
        name: 'Admin',
        components: {
            TrashVue,
            EditVue,
			ButtonVue
        },
        data() {
            return {}
        },
        methods: {
			...mapActions('product', ['updateProducts']),
            handleShowInfo(pid) {
                this.$router.push({ path: `/info/${pid}` })
            },
            addProduct() {
                this.$router.push({ path: `/admin/product/new-product` })
            },
            editProduct(pid) {
                this.$router.push({ path: `/admin/product/${pid}` })
            },
            deleteProduct(product) {
                Swal.fire({
                    title: '¿Estás seguro(a)?',
                    html: `¿Deseas eliminar el producto <b>${product.title}</b>?`,
                    footer: 'Esta acción no puede revertirse',
                    icon: 'warning',
                    showCloseButton: true,
                    showCancelButton: true,
                    cancelButtonText: 'Cancelar',
                    confirmButtonText: 'Eliminar',
                    reverseButtons: true,
                    imageUrl: product.img,
                    imageWidth: 'auto',
                    imageHeight: 200,
                    imageAlt: product.title
                })
                    .then(async (result) => {
                        if (result.isConfirmed) {
                            const response = await axios.delete(`${foodURL}/products/${product.id}`)
                            if (response.status === 200) {
								this.updateProducts({
                                    action: 'delete',
                                    product
                                })
							}
                        }
                    })
                    .catch(error => console.log(error))
            }
        },
        computed: {
			...mapGetters('product', ['getProducts']),
            products() {
                return this.getProducts
            }
        }
    }
</script>
<template>
    <div>
        <ButtonVue :click="addProduct" text="Agregar producto" />
		<div v-show="products.length" class="products">
            <div class="product-elements-header">
                <div class="product-elements">
                    <div class="product-element t-header">Producto</div>
                    <div class="product-element t-header">Imagen</div>
                    <div class="product-element t-header">Precio</div>
                    <div class="product-element t-header">Stock</div>
                    <div class="product-element t-header">Editar</div>
                    <div class="product-element t-header">Eliminar</div>
                </div>
            </div>
            <div v-for="(product, i) of products" :key="`${i}-product`">
                <div class="product-elements">
                    <div @click="() => handleShowInfo(product.id)" class="product-element route">
                        {{ product.title }}
                    </div>
                    <div class="product-element">
                        <div class="image-container">
                            <img
                                :src="product.img"
                                :alt="product.title"
                                @load="$event.target.style.opacity = 1"
                            />
                        </div>
                    </div>
                    <div class="product-element">
                        <span class="quantity">{{ product.price }}</span>
                    </div>
                    <div class="product-element">
                        <span class="quantity">{{ product.stock }}</span>
                    </div>
                    <div class="product-element">
                        <span class="click-cart" @click="() => editProduct(product.id)">
                            <EditVue />
                        </span>
                    </div>
                    <div
                        class="product-element click-cart trash"
                        @click="() => deleteProduct(product)"
                    >
                        <TrashVue />
                    </div>
                </div>
            </div>
            <div class="product-elements-header">
                <div class="product-elements">
                    <div class="product-element t-header">Producto</div>
                    <div class="product-element t-header">Imagen</div>
                    <div class="product-element t-header">Precio</div>
                    <div class="product-element t-header">Stock</div>
                    <div class="product-element t-header">Editar</div>
                    <div class="product-element t-header">Eliminar</div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .products {
        margin: 5px auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 0 10px;
        flex-wrap: wrap;
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
