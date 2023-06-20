<script>
import Card from '../components/Card.vue'
export default {
    name: 'Listing',
	emits: ['showInfo'],
    components: {
        Card
    },
    props: {
        products: Array
    },
    data() {
        return {}
    }, methods: {
		handleShowInfo(data) {
            this.$emit('showInfo', data)
        },
	}
}
</script>
<template>
    <div class="listing">
		<div v-for="(product, i) of products" :key="`${i}-product`">
			<Card :product="product" :index="i" @showInfo="handleShowInfo"></Card>
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
