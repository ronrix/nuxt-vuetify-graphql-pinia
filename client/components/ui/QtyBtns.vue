<script setup lang="ts">
const cartStore = useCart()
const props = defineProps<{
	qty: number
	id: string
}>()
</script>
<template>
	<div class="d-flex align-center">
		<v-btn
			size="sm"
			class="d-flex align-items text-white"
			style="width: 30px; height: 30px; border-radius: 50%; background-color: var(--primary)"
			variant="tonal"
			tabindex="-1"
			@click.stop="cartStore.incrementQty(props.id)"
		>
			+
		</v-btn>
		<input
			type="text"
			style="border: none; font-size: 12px; outline: none; width: 50px"
			:value="props.qty"
			class="text-center"
			tabindex="-1"
			readonly
		/>
		<v-btn
			size="sm"
			class="d-flex align-items"
			variant="tonal"
			style="width: 30px; height: 30px; border-radius: 50%"
			tabindex="-1"
			@click.stop="cartStore.decrementQty(props.id)"
		>
			-
		</v-btn>
	</div>
</template>
