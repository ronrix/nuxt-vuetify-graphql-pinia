<script setup lang="ts">
const cartStore = useCart()
defineProps({
	qty: { type: Number, required: true },
	id: { type: String, required: true },
})
</script>
<template>
	<div class="d-flex flex-column">
		<v-btn size="sm" class="text-h6" variant="text" @click="cartStore.incrementQty(id)">+</v-btn>
		<input
			type="text"
			style="border: 1px solid #f2f2f2; border: none; font-size: 12px"
			:value="qty"
			class="text-center text-white"
		/>
		<v-btn size="sm" class="text-h6" variant="text" @click="cartStore.decrementQty(id)">-</v-btn>
	</div>
</template>
