<template>
	<h2>
		<v-icon icon="mdi-rocket-launch" size="sm" />
		<span>{{ props.title }}</span>
	</h2>
</template>
<script>
export default {
	name: 'TitleComponent',
}
</script>
<script setup>
const props = defineProps({ title: { type: String, required: true } })
</script>
