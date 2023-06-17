<script>
export default {
    name: 'TemporalRouting',
    components: {},
    props: {
		toggleShow: {
			type: Function
		}
	},
    data() {
        return {}
    }
}
</script>
<template>
    <div class="button-container">
        <button class="btn btn-primary toggle" @click="toggleShow('showRegister')">Mostrar Registrarse</button>
        <button class="btn btn-primary toggle" @click="toggleShow('showLogin')">Mostrar Ingresar</button>
        <button class="btn btn-primary toggle" @click="toggleShow('showListing')">Mostrar Listado</button>
        <button class="btn btn-primary toggle" @click="toggleShow('showInfo')">Mostrar Info</button>
        <button class="btn btn-primary toggle" @click="toggleShow('showCart')">Mostrar Carrito</button>
    </div>
</template>
<style scoped>
.button-container {
    width: max-content;
    margin: 5px auto;
    display: flex;
}

.toggle {
	margin: auto 10px;
    align-items: end;
    line-height: 1.5;
}

</style>
