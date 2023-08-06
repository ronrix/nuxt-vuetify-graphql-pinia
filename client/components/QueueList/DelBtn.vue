<script setup lang="ts">
const cartStore = useCart()
const props = defineProps<{ id: string }>()
</script>
<template>
	<v-btn variant="text" color="red-darken-2" @click="cartStore.removeProduct(props.id)">
		<v-icon icon="mdi-trash-can" />
	</v-btn>
</template>
