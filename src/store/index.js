import { createStore, createLogger } from 'vuex'
import axios from 'axios'
import { getFromStorage, saveInStorage } from '../utils/sessionStorage'

const { MODE, VITE_FOOD_URL: foodURL, VITE_USER_URL: usersURL } = import.meta.env
const debug = MODE !== 'production'

const store = createStore({
    state: {
        products: [],
        fav: [],
        cart: [],
        user: {}
    },
    mutations: {
        setProducts(state, products) {
            state.products = products
        },
        toggleFav(state, { pid, fav }) {
            if (fav) state.fav.push(pid)
            else {
                const favIndex = state.fav.findIndex(e => pid === e)
                state.fav.splice(favIndex, 1)
            }
        },
        setFav(state, fav) {
            state.fav = fav
        },
        login(state, { user, cart }) {
            state.cart = cart
            state.fav = user.fav
            state.user = user
        },
        logout(state) {
            state.products = []
            state.fav = []
            state.cart = []
            state.user = {}
        },
        async setCart(state, cart) {
            state.cart = cart
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
        logout({ commit }) {
            commit('logout')
        },
        async toggleFav({ commit }, pid) {
            const fav = !this.state.fav.includes(pid.toString())
            const user = getFromStorage('user')
            if (user) {
                try {
                    commit('toggleFav', { pid, fav })
                    await axios.put(`${usersURL}/${user.id}`, { fav: this.state.fav })
                    user.fav = this.state.fav
                    saveInStorage('user', user)
                } catch (error) {
                    console.log(error)
                }
            }
        },
        setFav({ commit }, fav) {
            commit('setFav', fav)
        },
        async login({ commit, dispatch }, user) {
            try {
                const response = await axios.get(`${foodURL}/carts/${user.cart}`)
                const cart = response.data.cart
                if (response.status === 200) {
                    dispatch('getProducts')
                    commit('login', { user, cart })
                }
            } catch (error) {
                console.log(error)
            }
        },
        async isLogged({ dispatch }, user) {
            if (this.state.user.user === user.user) return
            dispatch('login', user)
        },
        async setQuantity({ commit }, { quantity, productId }) {
            const cart = [...this.state.cart]
            const cartIndex = cart.findIndex(e => productId === e.productId)
            if (cart.length === 0 || cartIndex === -1) cart.push({ quantity, productId })
            else if (quantity === 0) cart.splice(cartIndex, 1)
            else cart[cartIndex].quantity = quantity
            try {
                await axios.put(`${foodURL}carts/${this.state.user.cart}`, { cart })
                commit('setCart', cart)
            } catch (error) {
                console.log(error)
            }
        }
    },
    getters: {
        getProducts: state => state.products,
        getProductById: state => id => state.products.find(product => product.id === id.toString()),
        getFavById: state => id => state.fav.includes(id),
        getFav: state => state.fav,
        getName: state => (state.user.name ? state.user.name : ''),
        getQuantity: state => id => {
            if (id === -1 || state.cart.length === 0) return 0
            const cartIndex = state.cart.findIndex(e => id === e.productId)
            if (cartIndex === -1) return 0
            return state.cart[cartIndex].quantity
        },
        getCart: state => state.cart
    },
    plugins: debug ? [createLogger()] : []
})

export default store
