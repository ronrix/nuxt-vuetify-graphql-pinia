<script lang="ts" setup>
import numeral from 'numeral'
import { Order } from '@/types/'

const cartStore = useCart()
const props = defineProps<{
	order: Order
}>()
const show = ref<boolean>(false)
</script>
<template>
	<div
		class="d-flex align-center mb-1 order-list rounded rounded-xl mb-1 pa-0"
		:style="{
			position: 'relative',
			cursor: 'pointer',
		}"
		@click="show = true"
	>
		<v-col cols="3" style="position: relative">
			<ProductsImg :img="props.order.image || ''" />
		</v-col>

		<v-col class="text-h6 font-weight-black d-flex flex-column prevent-select">
			<div>
				<h4>{{ props.order.name }}</h4>
				<v-chip class="text-caption prevent-select" variant="outlined" color="info" size="small">
					{{ props.order.type }}
				</v-chip>
			</div>
			<div class="d-flex justify-space-between text-uppercase mt-2">
				<UiQtyBtns :id="props.order.id" :qty="props.order.qty" />
				<h3>${{ numeral(props.order.price).format('0.0a') }}</h3>
			</div>
		</v-col>
		<v-col cols="2" class="" style="height: 100%">
			<UiDelBtn :remove-fn="() => cartStore.removeProduct(props.order.id)">
				<v-icon icon="mdi-minus-circle" />
			</UiDelBtn>
		</v-col>
	</div>
	<v-divider style="background: var(--line)" />
	<!-- product options -->
	<ProductCustomization
		v-model="show"
		:show="show"
		:product-qty="props.order.qty"
		:customization="props.order.customization"
		:product-img="props.order.image || ''"
		:product-id="props.order.id"
	/>
</template>
<style scoped>
.order-list:hover {
	background: var(--light-grey-1) !important;
}
</style>
