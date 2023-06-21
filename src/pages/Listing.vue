<script>
import Card from '../components/Card.vue'
import { productInfoMixin } from '../mixins/productInfoMixin'

export default {
    name: 'Listing',
    emits: ['showInfo', 'handleQuantity', 'handleFav'],
    components: {
        Card
    },
	mixins: [productInfoMixin],
    props: {
        products: Array,
        cart: Array,
        fav: Array
    },
    data() {
        return {}
    },
    methods: {
        handleShowInfo(data) {
            this.$emit('showInfo', data)
        },
        handleQuantity(data) {
            this.$emit('handleQuantity', data)
        },
        handleFav(data) {
            this.$emit('handleFav', data)
        }
    }
}
</script>
<template>
    <div class="listing">
        <div v-for="(product, i) of products" :key="`${i}-product`">
            <Card
                :product="product"
				:fav="sendIsFav(i)"
                @showInfo="handleShowInfo"
                :quantity="sendQuantity(i)"
                @quantity="handleQuantity"
				@fav="handleFav"
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
