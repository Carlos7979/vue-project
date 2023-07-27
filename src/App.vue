<script>
    import HeaderVue from './components/HeaderVue.vue'
    import NavVue from './components/NavVue.vue'
	import { mapGetters } from 'vuex'

    export default {
        components: {
            HeaderVue,
            NavVue
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
        <HeaderVue></HeaderVue>
        <div class="main">
            <div v-show="name">
                <NavVue :name="name"></NavVue>
            </div>
            <RouterView />
        </div>
    </div>
</template>

<style scoped></style>
