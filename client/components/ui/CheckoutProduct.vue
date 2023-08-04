<script lang="ts" setup>
import numeral from 'numeral'

const cartStore = useCart()
const prop = defineProps({
	cart: { type: Object, required: true },
})
</script>
<template>
	<div class="d-flex align-center mb-1" style="border-radius: 20px; background: #51575733">
		<v-col cols="2">
			<UiQuantityBtn :id="prop.cart.id" :qty="prop.cart.qty" />
		</v-col>
		<v-col class="text-h6 font-weight-black d-flex flex-column">
			<span>{{ prop.cart.name }}</span>
			<!-- product category -->
			<span class="text-overline text-grey-lighten-1 font-weight-black">{{ prop.cart.type }}</span>
		</v-col>
		<v-col class="text-h5 text-uppercase" cols="3">
			<h5>${{ numeral(prop.cart.price).format('0.0a') }}</h5>
		</v-col>
		<v-btn variant="text" color="red-lighten-1" @click="cartStore.removeProduct(prop.cart.id)">
			<v-icon icon="mdi-trash-can" />
		</v-btn>
	</div>
</template>
<style lang="scss" scoped>
div > div.d-flex {
	position: relative;
}
</style>
