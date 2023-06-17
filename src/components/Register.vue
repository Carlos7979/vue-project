<script>
import Input from './Input.vue'

export default {
    name: 'Register',
    components: {
        Input
    },
    props: {},
    data() {
        return {
            form: {
                name: '',
                lastName: '',
                email: '',
                user: '',
                password: '',
                confirmPassword: ''
            }
        }
    },
    methods: {
        handleInput([name, value]) {
            this.form[name] = value
        }
    }
}
</script>
<template>
    <div class="register">
        <form action="" method="post">
            <Input type="text" id="name" placeholder="Nombre(s)" @input="handleInput"></Input>
            <Input type="text" id="lastName" placeholder="Apellido(s)" @input="handleInput"></Input>
            <Input
                type="email"
                id="email"
                placeholder="nickname@email"
                @input="handleInput"
            ></Input>
            <Input type="text" id="user" placeholder="user1" @input="handleInput"></Input>
            <Input type="password" id="password" placeholder="test123" @input="handleInput"></Input>
            <Input
                type="password"
                id="confirmPassword"
                placeholder="confirm password"
                @input="handleInput"
            ></Input>
        </form>
    </div>
</template>
<style scoped>
.register {
    width: max-content;
    margin: 5px auto;
    display: flex;
    border: dotted 1px black;
    border-radius: 5px;
    padding: 40px 80px;
    background-color: whitesmoke;
}

.info {
    display: flex;
    flex-direction: column;
    align-items: end;
    line-height: 1.5;
}

.data {
    padding-left: 0.5rem;
    line-height: 1.5;
}
</style>
