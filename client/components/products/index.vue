<script setup lang="ts">
import { Order } from '~~/client/types'

const { addOrder } = useCart()
const props = defineProps<{
	ships: Array<Order>
	isListView: Boolean
}>()
</script>
<template>
	<section class="overflow-y-auto overflow-x-hidden mt-1" style="height: calc(100vh - 250px)">
		<v-row no-gutters align-content="start" md="4" col="4">
			<ProductsItem
				v-for="ship in props.ships"
				:key="ship.id"
				:ship="ship"
				:is-list-view="isListView"
				@click="addOrder({ ...ship, customization: {} })"
			/>
			<v-spacer />
			<v-spacer />
			<v-spacer />
		</v-row>
	</section>
</template>
