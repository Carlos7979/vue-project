export const productInfo = {
	methods: {
		sendQuantity(id) {
            if (id === -1 || this.cart.length === 0) return 0
            const cartIndex = this.cart.findIndex(e => id === e.productId)
            if (cartIndex === -1) return 0
            return this.cart[cartIndex].quantity
        },
		sendIsFav(id) {
			if (this.fav.includes(id)) return true
			return false
		},
		sendProduct(id) {
			return this.products.find(e => e.id === id)
		}
	}
}