<script setup lang="ts">
const emit = defineEmits(['update:tabValue'])
const props = defineProps<{ tab: number }>()
</script>
<template>
	<v-tabs :value="props.tab" color="info" @change="emit('update:tabValue', !props.tab)">
		<v-tab :value="1" class="font-weight-medium">
			<v-icon icon="mdi-human-queue" :color="tab === 1 ? 'info' : ''" class="mr-1" />
			Queue
		</v-tab>
		<v-tab :value="2" class="font-weight-medium">
			<v-icon icon="mdi-close-circle" :color="tab === 2 ? 'red' : ''" class="mr-1" />
			Cancelled
		</v-tab>
		<v-tab :value="3" class="font-weight-medium">
			<v-icon icon="mdi-check-circle" :color="tab === 3 ? 'green' : ''" class="mr-1" />
			Completed
		</v-tab>
	</v-tabs>
</template>
