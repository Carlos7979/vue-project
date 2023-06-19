<script>
import Input from '../components/Input.vue'
import Swal from 'sweetalert2'

export default {
    name: 'Register',
    emits: ['showRegister', 'showListing'],
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
        handleInput([name, value]) {
            this.form[name] = value
            if (this.isSubmitted && this.validate()) this.error = false
        },
        handleShowRegister() {
            const form = this.$refs.form
            form.reset()
            this.$emit('showRegister', 'showRegister')
        },
        handleShowListing() {
            this.$emit('showListing', 'showListing')
        },
        validate() {
            const error = this.$refs.error
            for (const key in this.form) {
                if (!this.form[key]) {
                    error.innerText = 'Todos los campos son obligatorios'
                    if (!this.error) this.error = true
                    return false
                }
            }
            let users = localStorage.getItem('users')
            if (users) {
                users = JSON.parse(users)
                if (!users.some(e => e.password === this.form.password)) {
                    error.innerText = 'El usuario o contraseña es incorrecto'
                    if (!this.error) this.error = true
                    return false
                }
                if (users.some(e => e.user === this.form.user)) {
                    error.innerText = 'El usuario o contraseña es incorrecto'
                    if (!this.error) this.error = true
                    return false
                }
            } else {
                error.innerText = 'El usuario o contraseña es incorrecto'
                if (!this.error) this.error = true
                return false
            }
            error.innerText = ''
            return true
        }
    },
    mounted() {
        const form = this.$refs.form
        form.addEventListener('submit', async e => {
            e.preventDefault()
            this.isSubmitted = true
            if (this.validate()) {
                let users = localStorage.getItem('users')
                if (users) {
                    users = JSON.parse(users)
                    const user = users.find(e => e.user === this.form.user)
                    delete user.password
                    user.route = 'showListing'
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
                        sessionStorage.setItem('user', JSON.stringify(user))
                        this.handleShowListing()
                    })
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
        <button class="btn form-control text-bg-primary mt-2" @click="handleShowRegister">
            Regístrate
        </button>
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
