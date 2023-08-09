<script setup lang="ts">
import { IShip } from '~~/client/types'

const props = defineProps<{
	ships: Array<IShip>
	isListView: Boolean
	addToCart: (ship: IShip) => void
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
				@click="props.addToCart(ship)"
			/>
			<v-spacer />
		</v-row>
	</section>
</template>
