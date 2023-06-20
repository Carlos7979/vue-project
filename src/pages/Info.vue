<script>
import Card from '../components/Card.vue'
export default {
    name: 'Info',
    emits: ['showInfo', 'handleQuantity'],
    components: {
        Card
    },
    props: {
        product: Object,
		quantity: Number
    },
    data() {
        return {}
    },
    methods: {
		handleQuantity(data) {
			this.$emit('handleQuantity', data)
		}
	}
}
</script>
<template>
    <div class="listing">
        <Card :product="product" :detail="true" :quantity="quantity" @quantity="handleQuantity"></Card>
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
