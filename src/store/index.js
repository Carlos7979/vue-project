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
        user: {},
        orders: []
    },
    mutations: {
        setProducts(state, products) {
            state.products = products
        },
        setFav(state, fav) {
            state.fav = fav
        },
        login(state, { user, cart }) {
            state.cart = cart
            state.fav = user.fav
            state.user = user
            state.orders = user.orders
        },
        logout(state) {
            state.products = []
            state.fav = []
            state.cart = []
            state.user = {}
            state.orders = []
        },
        setCart(state, cart) {
            state.cart = cart
        },
        setOrders(state, orders) {
            state.orders = orders
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
        async toggleFav({ commit, state }, pid) {
            const fav = [...state.fav]
            pid = pid.toString()
            const isNotInFav = !fav.includes(pid)
            const user = getFromStorage('user')
            if (user) {
                try {
                    if (isNotInFav) fav.push(pid)
                    else {
                        const favIndex = fav.findIndex(e => pid === e)
                        fav.splice(favIndex, 1)
                    }
                    commit('setFav', fav)
                    await axios.put(`${usersURL}/${user.id}`, { fav })
                    user.fav = fav
                    saveInStorage('user', user)
                } catch (error) {
                    console.log(error)
                }
            }
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
        async isLogged({ dispatch, state }, user) {
            if (state.user.user === user.user) return
            dispatch('login', user)
        },
        async setQuantity({ commit, state }, { quantity, productId }) {
            const cart = [...state.cart]
            const cartIndex = cart.findIndex(e => productId === e.productId)
            if (cart.length === 0 || cartIndex === -1) cart.push({ quantity, productId })
            else if (quantity === 0) cart.splice(cartIndex, 1)
            else cart[cartIndex].quantity = quantity
            try {
                await axios.put(`${foodURL}carts/${state.user.cart}`, { cart })
                commit('setCart', cart)
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
        },
        addPurchase({ commit }, orders) {
            const user = getFromStorage('user')
            if (user) {
                user.orders = orders
                saveInStorage('user', user)
				commit('setOrders', orders)
				commit('setCart', [])
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
        getCart: state => state.cart,
        isAdmin: state => state.user.admin,
        getOrders: state => state.orders,
        getUser: state => state.user
    },
    plugins: debug ? [createLogger()] : []
})

export default store
