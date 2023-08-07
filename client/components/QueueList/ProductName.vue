<script setup lang="ts">
const props = defineProps<{
	name: string
	category: string
}>()
</script>
<template>
	<div>
		<h4>{{ props.name }}</h4>
		<v-chip class="text-caption prevent-select" variant="outlined" color="info" size="small">
			{{ props.category }}
		</v-chip>
	</div>
</template>
