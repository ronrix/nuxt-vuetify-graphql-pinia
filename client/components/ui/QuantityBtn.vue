<script setup lang="ts">
const cartStore = useCart()
const props = defineProps<{
	qty: number
	id: string
}>()
</script>
<template>
	<div class="d-flex flex-column">
		<v-btn size="sm" class="text-h6" variant="text" @click="cartStore.incrementQty(props.id)">+</v-btn>
		<input
			type="text"
			style="border: 1px solid #f2f2f2; border: none; font-size: 12px"
			:value="props.qty"
			class="text-center text-white"
		/>
		<v-btn size="sm" class="text-h6" variant="text" @click="cartStore.decrementQty(props.id)">-</v-btn>
	</div>
</template>
