<script>
import CardVue from '../components/CardVue.vue'
import { mapGetters } from 'vuex'
export default {
    name: 'Info',
    components: {
        CardVue
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
        <CardVue
            :product="product"
            :detail="true"
            :quantity="quantity"
        ></CardVue>
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
