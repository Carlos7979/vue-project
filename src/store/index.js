import { createStore, createLogger } from 'vuex'
import { cart } from './modules/cart'
import { product } from './modules/product'
import { user } from './modules/user'
const { MODE } = import.meta.env
const debug = MODE !== 'production'

const store = createStore({
    modules: {
		cart,
		product,
		user
	},
    plugins: debug ? [createLogger()] : []
})

export default store
