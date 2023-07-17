<script>
    import vueImg from './icons/vue.png'
    import coderImg from './icons/coderhouse.png'
    export default {
        components: {},
        props: {},
        data() {
            return {}
        },
        created() {
            this.title = 'Proyecto final (3ra entrega) | Vue Bakery'
            this.coderImg = coderImg
            this.coderW = 50
            this.vueImg = vueImg
            this.vueW = 50
        }
    }
</script>
<template>
    <div class="header">
        <div class="header-container">
            <img class="header-element" :src="vueImg" :width="vueW" alt="Vue" />
            <h1 class="header-element">{{ this.title }}</h1>
            <img class="header-element" :src="coderImg" :width="coderW" alt="Coder" />
        </div>
    </div>
</template>
<style>
    .header {
        background: gold;
        margin: 0 auto;
        padding: 10px 0;
    }

    .header-container {
        width: max-content;
        margin: 0 auto;
        display: flex;
        align-items: center;
    }

    .header-element {
        display: inline-block;
        margin: auto 10px;
    }
</style>
