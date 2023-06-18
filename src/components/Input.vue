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
        return {
			view: false
		}
    },
    methods: {
        handleInput(e) {
            this.$emit('input', [e.target.name, e.target.value.trim()])
        },
		handleView() {
			this.view = !this.view
		}
    }
}
</script>
<template>
    <div class="input-group mb-3">

        <span class="input-group-text">
			<i v-show="type === 'text'"><User /></i>
			<i v-show="type === 'email'"><Email /></i>
			<i v-show="type === 'password'"><Password /></i>
        </span>
        <input
            class="form-control"
            :type="type !== 'password' ? type : (!this.view ? 'password' : 'text' )"
            :name="id"
            :id="id"
            :placeholder="placeholder"
            @input="handleInput"
        />
		<span v-show="type === 'password'" class="input-group-text" id="basic-addon1" @click="handleView">
				<i v-show="!view"><EyeHide /></i>
				<i v-show="view"><EyeVisible /></i>
		</span>
    </div>
</template>
