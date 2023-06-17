<script >
	export default {
	name: 'Listing',
	components: {},
	props: {},
	data () {
		return {}
	}
}
</script>
<template>
	<div class="info-data">
		Listing
	</div>
</template>
<style scoped>
	.info-data {
		width: max-content;
		margin: 5px auto;
		display: flex;
	}

	.info {
		display: flex;
		flex-direction: column;
		align-items: end;
		line-height: 1.5;
	}

	.data {
		padding-left: 0.5rem;
		line-height: 1.5;
	}
</style>
