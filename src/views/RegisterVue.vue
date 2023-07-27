<script>
    import InputVue from '../components/InputVue.vue'
    import Swal from 'sweetalert2'
    import axios from 'axios'
    import { saveInStorage } from '../utils/sessionStorage'
    import { mapActions } from 'vuex'

    const usersURL = import.meta.env.VITE_USER_URL
    const foodURL = import.meta.env.VITE_FOOD_URL

    export default {
        name: 'Register',
        components: {
            InputVue
        },
        props: {},
        data() {
            return {
                form: {
                    name: '',
                    last_name: '',
                    email: '',
                    user: '',
                    password: '',
                    confirmPassword: ''
                },
                isSubmitted: false,
                error: false
            }
        },
        methods: {
            ...mapActions('user', ['login']),
            handleInput([name, value]) {
                this.form[name] = value
                if (this.isSubmitted && this.validate()) this.error = false
            },
            async validate() {
                const error = this.$refs.error
                for (const key in this.form) {
                    if (!this.form[key]) {
                        error.innerText = 'Todos los campos son obligatorios'
                        if (!this.error) this.error = true
                        return false
                    }
                }
                let user
                try {
                    let users = await axios.get(usersURL)
                    users = users.data
                    if (users.length) {
                        if (users.some(e => e.email === this.form.email)) {
                            error.innerText = 'El correo electrónico ya se encuentra registrado'
                            if (!this.error) this.error = true
                            return false
                        }
                        if (users.some(e => e.user === this.form.user)) {
                            error.innerText = 'El nombre de usuario ya se encuentra registrado'
                            if (!this.error) this.error = true
                            return false
                        }
                    }
                    if (this.form.password !== this.form.confirmPassword) {
                        error.innerText = 'Las contraseñas no coinciden'
                        if (!this.error) this.error = true
                        return false
                    }
                    error.innerText = ''
                    return true
                } catch (err) {
                    console.log(err)
                    if (err.message) {
                        error.innerText = `Falla del servidor:\n${err.message}`
                        if (!this.error) this.error = true
                    }
                    return false
                }
            },
            handleLogin(user) {
                this.login(user)
            }
        },
        mounted() {
            const form = this.$refs.form
            form.addEventListener('submit', async e => {
                e.preventDefault()
                this.isSubmitted = true
                try {
                    const validate = await this.validate()
                    if (validate) {
                        const body = {
                            ...this.form
                        }
                        delete body.confirmPassword
                        let cart = await axios.post(`${foodURL}/carts`)
                        if (cart.data) {
                            cart = cart.data
                            body.cart = cart.id
                            let user = await axios.post(usersURL, body)
                            if (user) {
                                user = user.data
                                delete user.password
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Registro exitoso',
                                    showConfirmButton: false,
                                    timer: 1500
                                }).then(() => {
                                    e.target.reset()
                                    for (const key in this.form) {
                                        this.form[key] = ''
                                    }
                                    this.isSubmitted = false
                                    saveInStorage('user', user)
                                    this.handleLogin(user)
                                    this.$router.push({ path: '/listing' })
                                })
                            }
                        }
                    }
                } catch (error) {
                    console.log(error)
                }
            })
        }
    }
</script>
<template>
    <div class="register">
        <form ref="form" action="" method="post">
            <InputVue type="text" id="name" placeholder="Nombre(s)" @input="handleInput"></InputVue>
            <InputVue
                type="text"
                id="last_name"
                placeholder="Apellido(s)"
                @input="handleInput"
            ></InputVue>
            <InputVue
                type="email"
                id="email"
                placeholder="nickname@email"
                @input="handleInput"
            ></InputVue>
            <InputVue type="text" id="user" placeholder="user1" @input="handleInput"></InputVue>
            <InputVue type="password" id="password" placeholder="test123" @input="handleInput"></InputVue>
            <InputVue
                type="password"
                id="confirmPassword"
                placeholder="confirm password"
                @input="handleInput"
            ></InputVue>
            <button class="btn form-control text-bg-dark p-3">REGÍSTRATE</button>
            <div ref="error" :class="error ? 'error' : ''"></div>
        </form>

        <RouterLink to="/">
            <button class="btn form-control text-bg-primary mt-2">Ingresar</button>
        </RouterLink>
    </div>
</template>
<style scoped>
    .register {
        width: max-content;
        margin: 5px auto;
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

    .error {
        background-color: rgb(250, 129, 92);
        color: white;
        animation: status 4s ease forwards;
        padding: 5px;
        border-radius: 5px;
    }
</style>
