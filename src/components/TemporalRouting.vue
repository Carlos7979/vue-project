<script>
export default {
    name: 'TemporalRouting',
    components: {},
    props: {
		handleShow: {
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
        <button class="btn btn-primary toggle" @click="handleShow('showRegister')">Mostrar Registrarse</button>
        <button class="btn btn-primary toggle" @click="handleShow('showLogin')">Mostrar Ingresar</button>
        <button class="btn btn-primary toggle" @click="handleShow('showListing')">Mostrar Listado</button>
        <button class="btn btn-primary toggle" @click="handleShow('showInfo')">Mostrar Info</button>
        <button class="btn btn-primary toggle" @click="handleShow('showCart')">Mostrar Carrito</button>
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
