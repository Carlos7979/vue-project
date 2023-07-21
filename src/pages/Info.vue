<script>
import Card from '../components/Card.vue'
import { mapGetters } from 'vuex'
export default {
    name: 'Info',
    components: {
        Card
    },
    data() {
        return {}
    },
    methods: {},
	computed: {
		...mapGetters('product', ['getProductById']),
		...mapGetters('cart', ['getQuantity']),
		product() {
			return this.getProductById(this.$route.params.id)
		},
		quantity() {
			return this.getQuantity(this.$route.params.id)
		}
	}
}
</script>
<template>
    <div class="listing">
        <Card
            :product="product"
            :detail="true"
            :quantity="quantity"
        ></Card>
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
