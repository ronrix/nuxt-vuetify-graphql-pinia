<script lang="ts" setup>
import numeral from 'numeral'
import { Cart } from '@/types/'

const prop = defineProps<{
	cart: Cart
}>()
</script>
<template>
	<div class="d-flex align-center mb-1 queue-list rounded rounded-xl mb-1">
		<v-col cols="3" style="position: relative">
			<ProductsImg :img="prop.cart.image" />
		</v-col>

		<v-col class="text-h6 font-weight-black d-flex flex-column prevent-select">
			<div>
				<h4>{{ prop.cart.name }}</h4>
				<v-chip class="text-caption prevent-select" variant="outlined" color="info" size="small">
					{{ prop.cart.type }}
				</v-chip>
			</div>
			<div class="d-flex justify-space-between text-uppercase mt-2">
				<UiQtyBtns :id="prop.cart.id" :qty="prop.cart.qty" />
				<h3>${{ numeral(prop.cart.price).format('0.0a') }}</h3>
			</div>
		</v-col>
		<v-col cols="2" class="" style="height: 100%">
			<QueueListDelBtn :id="prop.cart.id" />
		</v-col>
	</div>
	<v-divider style="background: var(--line)" />
</template>
<style scoped>
.queue-list {
	position: relative;
	background: transparent;
}
.queue-list:hover {
	background: var(--light-grey-1);
}

.v-chip {
	white-space: pre-wrap;
}
.v-card.on-hover {
	background: var(--light-grey-1) !important;
}
</style>
