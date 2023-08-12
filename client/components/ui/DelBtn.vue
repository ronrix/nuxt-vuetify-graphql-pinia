<script setup lang="ts">
const props = defineProps<{ removeFn: () => void }>()
</script>
<template>
	<v-btn variant="text" color="red-darken-2 text-h6" @click="props.removeFn">
		<slot />
	</v-btn>
</template>
