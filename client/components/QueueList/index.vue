<script lang="ts" setup>
import { Cart } from '@/types/'

const prop = defineProps<{
	cart: Cart
}>()
const show = ref<boolean>(false)
</script>
<template>
	<div
		class="d-flex align-center mb-1 queue-list rounded rounded-xl mb-1 pa-0"
		:style="{
			position: 'relative',
			cursor: 'pointer',
		}"
		@click="show = true"
	>
		<v-col cols="3" style="position: relative">
			<ProductsImg :img="prop.cart.image || ''" />
		</v-col>

		<v-col class="text-h6 font-weight-black d-flex flex-column prevent-select">
			<QueueListProductName :name="prop.cart.name" :category="prop.cart.type" />
			<QueueListProductPrice :id="prop.cart.id" :qty="prop.cart.qty" :price="prop.cart.price" />
		</v-col>
		<v-col cols="2" class="" style="height: 100%">
			<QueueListDelBtn :id="prop.cart.id" />
		</v-col>
	</div>
	<v-divider style="background: var(--line)" />
	<!-- product options -->
	<ProductCustomization
		v-model="show"
		:show="show"
		:product-qty="cart.qty"
		:customization="cart.customization"
		:product-img="cart.image"
		:product-id="cart.id"
	/>
</template>
<style scoped>
.queue-list:hover {
	background: var(--light-grey-1) !important;
}
</style>
