<script>
    const icons = await import('./icons/form')
    export default {
        name: 'Input',
        emits: ['input'],
        components: {
            ...icons
        },
        props: {
            type: String,
            id: String,
            placeholder: String,
            label: String,
			max: String,
			min: String,
			textValue: String,
			numberValue: Number
        },
        data() {
            return {
                view: false
            }
        },
        methods: {
            handleInput(e) {
				const name = e.target.name
				let value = e.target.value
				if (e.target.type === 'number') value = Number(value)
				if (typeof value === 'string') value = value.trim()
                this.$emit('input', [name, value])
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
            <label v-show="label" :for="id">{{ label }}</label>
            <div v-show="!label">
				<i v-show="type === 'text'"><UserVue /></i>
				<i v-show="type === 'email'"><EmailVue /></i>
				<i v-show="type === 'password'"><PasswordVue /></i>
			</div>
        </span>
        <input
            v-show="type !== 'textarea'"
			class="form-control"
            :type="type !== 'password' ? type : !this.view ? 'password' : 'text'"
            :name="id"
            :id="id"
            :placeholder="placeholder"
			:max="max"
			:min="min"
			:value="type === 'number' ? numberValue : textValue"
            @input="handleInput"
        />
		<textarea
            v-show="type === 'textarea'"
			class="form-control"
            :type="type !== 'password' ? type : !this.view ? 'password' : 'text'"
            :name="id"
            :id="id"
            :placeholder="placeholder"
			:maxlength="max"
			:value="textValue"
            @input="handleInput"
        />
        <span
            v-show="type === 'password'"
            class="input-group-text"
            id="basic-addon1"
            @click="handleView"
        >
            <i v-show="!view"><EyeVisible /></i>
            <i v-show="view"><EyeHide /></i>
        </span>
    </div>
</template>
