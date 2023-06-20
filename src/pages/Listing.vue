<script>
import Card from '../components/Card.vue'
export default {
    name: 'Listing',
	emits: ['showInfo', 'handleQuantity'],
    components: {
        Card
    },
    props: {
        products: Array,
		cart: Array
    },
    data() {
        return {}
    }, methods: {
		handleShowInfo(data) {
            this.$emit('showInfo', data)
        },
		sendQuantity(index) {
			if (this.cart.length === 0) return 0
            const cartIndex = this.cart.findIndex(e => index === e.productIndex)
			if (cartIndex === -1) return 0
			return this.cart[cartIndex].quantity
		},
		handleQuantity(data) {
			this.$emit('handleQuantity', data)
		}
	}
}
</script>
<template>
    <div class="listing">
		<div v-for="(product, i) of products" :key="`${i}-product`">
			<Card :product="product" :index="i" @showInfo="handleShowInfo" :quantity="sendQuantity(i)" @quantity="handleQuantity"></Card>
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
