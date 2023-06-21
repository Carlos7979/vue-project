export const productInfoMixin = {
	methods: {
		sendQuantity(index) {
            if (index === -1 || this.cart.length === 0) return 0
            const cartIndex = this.cart.findIndex(e => index === e.productIndex)
            if (cartIndex === -1) return 0
            return this.cart[cartIndex].quantity
        },
		sendIsFav(index) {
			if (this.fav.includes(index)) return true
			return false
		}
	}
}