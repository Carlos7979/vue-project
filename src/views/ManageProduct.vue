<script>
    import InputVue from '../components/InputVue.vue'
    import Swal from 'sweetalert2'
    import axios from 'axios'
    import { mapGetters, mapActions } from 'vuex'

    const foodURL = import.meta.env.VITE_FOOD_URL

    export default {
        name: 'ManageProduct',
        components: {
            InputVue
        },
        props: {},
        data() {
            return {
                form: {
                    title: '',
                    img: '',
                    shortDescription: '',
                    largeDescription: '',
                    price: '',
                    stock: ''
                },
                isSubmitted: false,
                error: false
            }
        },
        methods: {
            ...mapActions('product', ['updateProducts']),
            handleInput([name, value]) {
                this.form[name] = value
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
                return true
            },
            handleUpdateProducts(payload) {
                this.updateProducts(payload)
            }
        },
        mounted() {
            if (this.product) {
                for (const key in this.product) {
                    this.handleInput([key, this.product[key]])
                }
            }
            const form = this.$refs.form
            form.addEventListener('submit', async e => {
                e.preventDefault()
                this.isSubmitted = true
                try {
                    if (this.validate()) {
                        const body = {
                            ...this.form
                        }
                        let product, action
                        if (this.$route.name === 'new-product') {
                            product = await axios.post(`${foodURL}/products`, body)
                            action = 'create'
                        } else {
                            const pid = this.$route.params.id
                            product = await axios.put(`${foodURL}/products/${pid}`, body)
                            action = 'update'
                        }
                        const status = product.status
                        if (status === 201 || 200) {
                            product = product.data
                            Swal.fire({
                                icon: 'success',
                                title: `Producto ${
                                    status === 201 ? 'creado' : 'actualizado'
                                } exitosamente`,
                                showConfirmButton: false,
                                timer: 1500
                            }).then(() => {
                                this.handleUpdateProducts({
                                    action: status === 201 ? 'create' : 'update',
                                    product
                                })
                                this.isSubmitted = false
                            })
                        }
                    }
                } catch (error) {
                    console.log(error)
                }
            })
        },
        computed: {
            ...mapGetters('product', ['getProductById']),
            product() {
                if (this.$route.name === 'edit-product') {
                    return this.getProductById(this.$route.params.id)
                } else {
                    return {}
                }
            }
        }
    }
</script>
<template>
    <div class="manage-product-container">
        <div class="manage-product">
            <form ref="form" action="" method="post">
                <InputVue
                    label="Título:"
                    type="text"
                    id="title"
                    placeholder="Selva negra..."
                    :textValue="product?.title"
                    @input="handleInput"
                ></InputVue>
                <InputVue
                    label="Url de la imagen:"
                    type="text"
                    id="img"
                    placeholder="https://..."
                    :textValue="product.img"
                    @input="handleInput"
                ></InputVue>
                <InputVue
                    label="Descripción corta"
                    type="textarea"
                    max="95"
                    id="shortDescription"
                    placeholder="...hasta 95 caracteres"
                    :textValue="product.shortDescription"
                    @input="handleInput"
                ></InputVue>
                <InputVue
                    label="Descripción larga"
                    type="textarea"
                    id="largeDescription"
                    placeholder="Introduce una descripción del producto..."
                    :textValue="product.largeDescription"
                    @input="handleInput"
                ></InputVue>
                <InputVue
                    label="Precio"
                    type="number"
                    id="price"
                    placeholder="200..."
                    :numberValue="product.price"
                    min="0"
                    @input="handleInput"
                ></InputVue>
                <InputVue
                    label="Stock"
                    type="number"
                    id="stock"
                    placeholder="10..."
                    :numberValue="product.stock"
                    min="0"
                    @input="handleInput"
                ></InputVue>
                <button class="btn form-control text-bg-dark p-3">
                    {{ $route.name === 'new-product' ? 'Agregar Producto' : 'Actualizar Producto' }}
                </button>
                <div ref="error" :class="error ? 'error' : ''"></div>
            </form>
            <RouterLink to="/admin">
                <button class="btn form-control text-bg-primary mt-2">Volver</button>
            </RouterLink>
        </div>
        <div class="manage-product url-preview">
            <div class="preview-title">Vista previa de la imagen</div>
            <img
                :src="form.img || (product && product.img)"
                alt="url-preview"
                @load="$event.target.style.opacity = 1"
            />
        </div>
    </div>
</template>
<style scoped>
    .manage-product-container {
        display: flex;
        flex-wrap: wrap;
    }
    .manage-product {
        width: max-content;
        margin: 5px auto;
        border-radius: 5px;
        padding: 40px 80px;
        background-color: whitesmoke;
    }

    .url-preview {
        width: 40%;
    }

    .preview-title {
        text-align: center;
        font-size: larger;
        font-weight: 500;
        margin-bottom: 20px;
    }

    img {
        width: 90%;
        opacity: 0;
        transition: opacity 1s ease-in-out;
        border-radius: 10px;
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
