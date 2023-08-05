<script setup lang="ts">
defineProps({
	img: { type: String, required: true },
})
</script>
<template>
	<v-img
		:src="img"
		lazy-src="https://images.unsplash.com/photo-1601892782633-675465fa7f3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=876&q=80"
		height="150px"
		cover
		style="border-radius: 10px"
		rounded
	>
		<template #placeholder>
			<div class="d-flex align-center justify-center fill-height">
				<v-progress-circular color="grey-lighten-4" indeterminate />
			</div>
		</template>
	</v-img>
</template>
