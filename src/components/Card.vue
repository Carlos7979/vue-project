<script>
const icons = await import('./icons/card')

export default {
    name: 'Card',
    emits: ['showInfo', 'quantity', 'quantity'],
    components: {
        ...icons
    },
    props: {
        product: Object,
        index: Number,
		detail: {
			type: Boolean,
			default: false
		},
		quantity: {
			type: Number,
			default: 0
		}
    },
    data() {
        return {
            fav: false,
        }
    },
    methods: {
        toggleFav() {
            this.fav = !this.fav
        },
        addQuantity() {
			console.log(this.quantity);
			this.$emit('quantity', [this.quantity + 1, this.product.id - 1 ])
        },
        removeQuantity() {
            if (this.quantity > 0) this.$emit('quantity', [this.quantity - 1, this.product.id - 1])
        },
        handleShowInfo() {
			if (this.detail) return
            this.$emit('showInfo', ['showInfo', this.index])
        }
    }
}
</script>
<template>
    <div v-show="Object.keys(product).length > 0" :class="detail ? 'card detail': 'card'">
        <div class="heart" @click="toggleFav">
            <div v-show="!fav"><Heart /></div>
            <div v-show="fav" class="fav"><HeartSolid /></div>
        </div>
        <img
            :src="product.img"
            :class="detail ? 'card-img-top' : 'card-img-top card-image'"
            :alt="product.title"
            :height="!detail ? '200': ''"
            @click="handleShowInfo"
        />
        <div class="card-body">
            <h5 class="card-title"></h5>
            <p class="card-text">
                {{detail ? product.largeDescription : product.shortDescription }}
            </p>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">Precio: {{ product.price }} $</li>
        </ul>
        <div class="card-body">
            <span class="card-link">Agregar al carrito</span>
            <div class="add-cart-icons">
                <div class="click-cart" @click="addQuantity">
                    <div :class="quantity ? 'added-cart' : ''"><CartPlusIcon /></div>
                </div>
                <div class="quantity">{{ quantity }}</div>
                <div :class="quantity ? 'click-cart' : 'disable'" @click="removeQuantity">
                    <div :class="quantity ? 'remove-cart' : ''"><CartMinusIcon /></div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card {
    margin: 5px;
    position: relative;
	width: 18rem;
}

.detail {
	min-width: 36rem;
	height: auto;
}

.card-image {
    cursor: pointer;
}

.heart {
    position: absolute;
    color: aliceblue;
    right: 5px;
    padding: 0 2px;
    border-radius: 100%;
    margin-top: 3px;
    background-color: rgba(105, 105, 105, 0.2);
}

/* .click-cart {
	width: fit-content;
	border: 1px solid;
} */

.heart:hover,
.click-cart:hover {
    cursor: pointer;
}

.heart:active {
    top: 1px;
    right: 4px;
}

.add-cart-icons {
	display: flex;
	justify-content: space-between;
}
.click-cart:active {
    position: relative;
    top: 1px;
    left: 1px;
}

.fav {
    color: red;
}

.added-cart {
    color: forestgreen;
}

.disable {
    color: grey;
}
</style>
