<script>
import Card from '../components/Card.vue'
export default {
    name: 'Listing',
    emits: ['showInfo'],
    components: {
        Card
    },
    props: {
        product: Object
    },
    data() {
        return {}
    },
    methods: {}
}
</script>
<template>
    <div class="listing">
        <Card :product="product" :detail="true"></Card>
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
