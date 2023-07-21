<script>
    import Header from './components/Header.vue'
    import Nav from './components/Nav.vue'
	import { mapGetters } from 'vuex'

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
			...mapGetters('user', ['getName']),
            name() {
                return this.getName
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
