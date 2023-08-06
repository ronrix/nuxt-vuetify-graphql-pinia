<script lang="ts" setup>
import numeral from 'numeral'
import { Cart } from '@/types/'

const prop = defineProps<{
	cart: Cart
}>()
</script>
<template>
	<div class="d-flex align-center mb-1 queue-list">
		<UiGlass style="background: #51575733" />

		<v-col cols="2">
			<UiQtyBtns :id="prop.cart.id" :qty="prop.cart.qty" />
		</v-col>

		<v-col class="text-h6 font-weight-black d-flex flex-column prevent-select">
			<span>{{ prop.cart.name }}</span>
			<!-- product category -->
			<v-chip class="text-caption bg-green-lighten-2 font-weight-black align-self-start" variant="flat">
				{{ prop.cart.type }}
			</v-chip>
		</v-col>

		<v-col class="text-h5 text-uppercase prevent-select text-green-darken-2" cols="3">
			<h5>${{ numeral(prop.cart.price).format('0.0a') }}</h5>
		</v-col>

		<QueueListDelBtn :id="prop.cart.id" />
	</div>
</template>
<style scoped>
.queue-list {
	position: relative;
	background: transparent;
	border-radius: 20px;
}

.v-chip {
	white-space: pre-wrap;
}
</style>
