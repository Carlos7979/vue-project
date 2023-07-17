<script>
    import Card from '../components/Card.vue'
    import { productInfo } from '../mixins/productInfo'

    export default {
        name: 'Listing',
        emits: ['handleQuantity', 'handleFav'],
        components: {
            Card
        },
        props: {
            cart: Array
        },
        mixins: [productInfo],
        data() {
            return {}
        },
        methods: {
            getQuantity(id) {
				return this.$store.getters.getQuantity(id)
			}
        },
        computed: {
            products() {
                return this.$store.getters.getProducts
            }
        }
    }
</script>
<template>
    <div class="listing">
        <div class="empty" v-show="!products.length">No hay productos en existencia</div>
        <div v-for="(product, i) of products" :key="`${i}-product`">
            <Card
                :product="product"
                :quantity="getQuantity(product.id)"
            ></Card>
        </div>
    </div>
</template>
<style scoped>
    .listing {
        margin: 5px auto;
        display: flex;
        justify-content: center;
        padding: 0 10px;
        flex-wrap: wrap;
    }
    .empty {
        margin-right: 40%;
    }
</style>
