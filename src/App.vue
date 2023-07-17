<script>
    import Header from './components/Header.vue'
    import Nav from './components/Nav.vue'
	
    export default {
        components: {
            Header,
            Nav
        },
        data() {
            return {}
        },
        async created() {},
        methods: {},
        computed: {
            name() {
                return this.$store.getters.getName
            }
        }
    }
</script>

<template>
    <div>
        <Header></Header>
        <div class="main">
            <div v-show="name">
                <Nav :name="name"></Nav>
            </div>
            <RouterView />
        </div>
    </div>
</template>

<style scoped></style>
