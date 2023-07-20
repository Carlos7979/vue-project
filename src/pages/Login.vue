<script>
    import Input from '../components/Input.vue'
    import Swal from 'sweetalert2'
    import axios from 'axios'
    import { saveInStorage } from '../utils/sessionStorage'
    const usersURL = import.meta.env.VITE_USER_URL

    export default {
        name: 'Login',
        components: {
            Input
        },
        props: {},
        data() {
            return {
                form: {
                    user: '',
                    password: ''
                },
                isSubmitted: false,
                error: false
            }
        },
        methods: {
            async handleInput([name, value]) {
                this.form[name] = value
                if (this.isSubmitted && (await this.validate())) this.error = false
            },
            handleShowRegister() {
                const form = this.$refs.form
                form.reset()
                this.$router.push({ path: '/register' })
            },
            validate(unauthorized, authError) {
                const error = this.$refs.error
                if (unauthorized) {
                    error.innerText = 'Debes identificarte como usuario'
                    if (!this.error) this.error = true
                    this.isSubmitted = true
                    return false
                }
                if (authError) {
                    error.innerText = 'El usuario o contraseña es incorrecto'
                    if (!this.error) this.error = true
                    return false
                }
                for (const key in this.form) {
                    if (!this.form[key]) {
                        error.innerText = 'Todos los campos son obligatorios'
                        if (!this.error) this.error = true
                        return false
                    }
                }
                error.innerText = ''
                return true
            }
        },
        mounted() {
            if (this.$route.name === 'unauthorized') this.validate(true)
            const form = this.$refs.form
            form.addEventListener('submit', async e => {
                e.preventDefault()
                this.isSubmitted = true
                try {
                    let user
                    let users = await axios.get(usersURL)
                    users = users.data
                    if (users.length) {
                        user = users.find(e => e.user === this.form.user)
                        if (!user) {
                            this.validate(null, true)
                            return
                        }
                        if (user.password !== this.form.password) {
                            this.validate(null, true)
                            return
                        }
                    } else {
                        this.validate(null, true)
                        return
                    }
                    if (this.validate()) {
                        delete user.password
                        Swal.fire({
                            icon: 'success',
                            title: 'Ingreso exitoso',
                            showConfirmButton: false,
                            timer: 1500
                        }).then(() => {
                            e.target.reset()
                            for (const key in this.form) {
                                this.form[key] = ''
                            }
                            this.isSubmitted = false
                            saveInStorage('user', user)
							this.$store.dispatch('login', user)
                            this.$router.push({ path: `/${user.admin ? 'admin' : 'listing'}` })
                        })
                    }
                } catch (err) {
                    console.log(err)
                    if (err.message) {
                        error.innerText = `Falla del servidor:\n${err.message}`
                        if (!this.error) this.error = true
                    }
                }
            })
        }
    }
</script>
<template>
    <div class="register">
        <form ref="form" action="" method="post">
            <Input type="text" id="user" placeholder="user1" @input="handleInput"></Input>
            <Input type="password" id="password" placeholder="test123" @input="handleInput"></Input>
            <button class="btn form-control text-bg-dark p-3">INGRESAR</button>
            <div ref="error" :class="error ? 'error' : ''"></div>
        </form>
        <RouterLink to="/register">
            <button class="btn form-control text-bg-primary mt-2">Regístrate</button>
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
