import axios from 'axios'
import { getFromStorage, saveInStorage } from '../../utils/sessionStorage'

const { VITE_FOOD_URL: foodURL, VITE_USER_URL: usersURL } = import.meta.env

export const user = {
	namespaced: true,
    state: {
        user: {},
        fav: [],
        orders: []
    },
    getters: {
        getFavById: state => id => state.fav.includes(id),
        getFav: state => state.fav,
        getName: state => (state.user.name ? state.user.name : ''),
        isAdmin: state => state.user.admin,
        getOrders: state => state.orders,
        getUser: state => state.user
    },
    mutations: {
        setFav(state, fav) {
            state.fav = fav
        },
        login(state, user) {
            state.fav = user.fav
            state.user = user
            state.orders = user.orders
        },
        logout(state) {
            state.fav = []
            state.user = {}
            state.orders = []
        },
        setOrders(state, orders) {
            state.orders = orders
        }
    },
    actions: {
        logout({ commit }) {
            commit('logout')
			commit('cart/setCart', [], { root: true })
			commit('product/setProducts', [], { root: true })
        },
		async login({ commit, dispatch }, user) {
            try {
                const response = await axios.get(`${foodURL}/carts/${user.cart}`)
                const cart = response.data.cart
                if (response.status === 200) {
                    dispatch('product/getProducts', { payload: null }, { root: true })
                    commit('login', user)
					commit('cart/setCart', cart, { root: true })
                }
            } catch (error) {
                console.log(error)
            }
        },
        async isLogged({ dispatch, state }, user) {
            if (state.user.user === user.user) return
            dispatch('login', user)
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
		addPurchase({ commit }, orders) {
            const user = getFromStorage('user')
            if (user) {
                user.orders = orders
                saveInStorage('user', user)
                commit('setOrders', orders)
                commit('cart/setCart', [], { root: true })
            }
        }
    }
}
