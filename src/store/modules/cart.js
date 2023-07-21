import axios from 'axios'

const { VITE_FOOD_URL: foodURL } = import.meta.env

export const cart = {
	namespaced: true,
    state: {
        cart: []
    },
	getters: {
        getQuantity: state => id => {
			const product = state.cart.find(product => product.productId === id)
            return product ? product.quantity : 0
        },
        getCart: state => state.cart
    },
    mutations: {
        setCart(state, cart) {
            state.cart = cart
        }
    },
    actions: {
        async setQuantity({ commit, state, rootState: { user } }, { quantity, productId }) {
            const cart = [...state.cart]
            const cartIndex = cart.findIndex(e => productId === e.productId)
            if (cart.length === 0 || cartIndex === -1) cart.push({ quantity, productId })
            else if (quantity === 0) cart.splice(cartIndex, 1)
            else cart[cartIndex].quantity = quantity
            try {
                await axios.put(`${foodURL}carts/${user.user.cart}`, { cart })
                commit('setCart', cart)
            } catch (error) {
                console.log(error)
            }
        }
    }
}