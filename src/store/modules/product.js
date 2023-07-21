import axios from 'axios'

const { VITE_FOOD_URL: foodURL } = import.meta.env

export const product = {
	namespaced: true,
    state: {
        products: []
    },
    getters: {
        getProducts: state => state.products,
        getProductById: state => id => state.products.find(product => product.id === id.toString())
    },
    mutations: {
        setProducts(state, products) {
            state.products = products
        }
    },
    actions: {
        async getProducts({ commit }) {
            try {
                const response = await axios.get(`${foodURL}/products`)
                if (response.status === 200) {
                    if (response.data.length) commit('setProducts', response.data)
                }
            } catch (error) {
                console.log(error)
            }
        },
        updateProducts({ commit, state }, { action, product }) {
            const products = [...state.products]
            const index = products.findIndex(e => e.id === product.id)
            if (action === 'create') {
                products.push(product)
            }
            if (action === 'delete') {
                products.splice(index, 1)
            }
            if (action === 'update') {
                products.splice(index, 1, product)
            }
            commit('setProducts', products)
        }
    }
}
