<script>
    export default {
        name: 'Button',
        emits: [],
        mixins: [],
        components: {},
        props: {
            click: Function,
			text: String
        },
        data() {
            return {}
        },
        created() {},
        mounted() {},
        methods: {},
        computed: {},
        watch: {}
    }
</script>

<template>
    <div @click="click" class="button">{{ text }}</div>
</template>

<style scoped>
    .button {
        margin: 30px auto;
        width: fit-content;
        background: whitesmoke;
        border-radius: 10px;
        padding: 30px 50px;
        font-size: larger;
        font-weight: 600;
        border: gray 4px solid;
    }

	.button:hover {
        cursor: pointer;
        color: blue;
        border-color: darkgray;
    }

    .button:active {
        position: relative;
        top: 1px;
        left: 1px;
        color: gray;
    }
</style>
