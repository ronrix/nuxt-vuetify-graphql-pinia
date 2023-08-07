<script setup lang="ts">
const cartStore = useCart()
const props = defineProps<{ id: string }>()
</script>
<template>
	<v-btn variant="text" color="red-darken-2 text-h6" @click="cartStore.removeProduct(props.id)">
		<v-icon icon="mdi-minus-circle" />
	</v-btn>
</template>
