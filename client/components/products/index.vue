<script setup lang="ts">
const { ships, addToCart, isListView } = useProducts()
</script>
<template>
	<v-checkbox v-model="isListView" label="List view" />
	<v-row no-gutters align-content="start" cols="12" sm="4">
		<ProductsItem
			v-for="ship in ships"
			:key="ship.id"
			:ship="ship"
			:is-list-view="isListView"
			@click="addToCart(ship)"
		/>
	</v-row>
</template>
