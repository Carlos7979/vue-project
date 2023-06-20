<script>
import Card from '../components/Card.vue'
export default {
    name: 'Info',
    emits: ['showInfo', 'handleQuantity', 'handleFav'],
    components: {
        Card
    },
    props: {
        product: Object,
        quantity: Number,
        fav: Boolean
    },
    data() {
        return {}
    },
    methods: {
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
        <Card
            :product="product"
            :detail="true"
			:fav="fav"
            :quantity="quantity"
            @quantity="handleQuantity"
			@fav="handleFav"
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
