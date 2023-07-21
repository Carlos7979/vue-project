<script>
    import Card from '../components/Card.vue'
	import { mapGetters } from 'vuex'
    export default {
        name: 'Listing',
        components: {
            Card
        },
        props: {
            cart: Array
        },
        data() {
            return {}
        },
        methods: {},
        computed: {
			...mapGetters('product', ['getProducts']),
			...mapGetters('cart', ['getQuantity']),
            products() {
                return this.getProducts
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
</style>
