<script setup lang="ts">
const { data, tab } = useCartsOrder()
</script>
<template>
	<div>
		<CartsTab v-model="tab" :tab="tab" />
		<v-window
			v-model="tab"
			class="overflow-y-auto overflow-x-hidden mt-1"
			style="height: calc(100vh - 150px)"
		>
			<Carts :data="data" />
		</v-window>
	</div>
</template>
