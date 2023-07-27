<script>
    import CardVue from '../components/CardVue.vue'
	import { mapGetters } from 'vuex'
    export default {
        name: 'Listing',
        components: {
            CardVue
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
        <div v-for="(product, i) of products" :key="`${i}-product`">
            <CardVue
                :product="product"
                :quantity="getQuantity(product.id)"
            ></CardVue>
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
