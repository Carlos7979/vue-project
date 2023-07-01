<script>
    export default {
        name: 'NotFound',
        emits: ['notFound'],
        mixins: [],
        components: {},
        props: {},
        data() {
            return {}
        },
        created() {},
        mounted() {
            this.$emit('notFound', 'showNotFound')
        },
        methods: {},
        computed: {},
        watch: {}
    }
</script>

<template>
    <div class="notFound">404</div>
</template>

<style scoped>
    .notFound {
		width: fit-content;
		padding: 40px;
		margin: 30px 39%;
		background-color: whitesmoke;
		border-radius: 5px;
		border: solid 1px;
		font-size: xx-large;
		font-weight: 600;
    }
</style>
