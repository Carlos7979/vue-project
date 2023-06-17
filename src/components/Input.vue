<script>
const icon = await import('./icons/form')
// const Icon = icon['Email']
export default {
    name: 'Input',
    emits: ['input'],
    components: {
		...icon
    },
    props: {
        type: String,
        id: String,
        placeholder: String
    },
    data() {
        return {}
    },
    methods: {
        handleInput(e) {
            return this.$emit('input', [e.target.name, e.target.value])
        }
    }
}
</script>
<template>
    <div class="input-group mb-3">

        <span class="input-group-text" id="basic-addon1">
			<i v-show="type === 'text'"><User /></i>
			<i v-show="type === 'email'"><Email /></i>
			<i v-show="type === 'password'"><Password /></i>
        </span>
        <input
            class="form-control"
            :type="type"
            :name="id"
            :id="id"
            :placeholder="placeholder"
            @input="handleInput"
        />
    </div>
</template>
