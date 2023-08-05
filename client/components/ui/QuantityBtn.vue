<script setup lang="ts">
const cartStore = useCart()
const props = defineProps<{
	qty: number
	id: string
}>()
</script>
<template>
	<div class="d-flex flex-column">
		<v-btn
			size="sm"
			class="text-h6 bg-blue-darken-1"
			variant="tonal"
			@click="cartStore.incrementQty(props.id)"
		>
			+
		</v-btn>
		<input
			type="text"
			style="border: 1px solid #484b4e; font-size: 12px; outline: none"
			:value="props.qty"
			class="text-center text-white"
		/>
		<v-btn size="sm" class="text-h6" variant="tonal" @click="cartStore.decrementQty(props.id)">-</v-btn>
	</div>
</template>
