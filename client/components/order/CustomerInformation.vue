<script setup lang="ts">
const cartStore = useCart()
</script>
<template>
	<v-list>
		<v-list-item color="#93939C" class="mb-2 pa-0">
			<h3 class="font-weight-bold">Customer Information</h3>
			<v-text-field
				v-model="cartStore.customerName"
				label="Customer Name"
				variant="outlined"
				class="mt-2"
				hide-details="auto"
				style="border-radius: 20px"
			/>
			<SelectTable />
		</v-list-item>
		<v-divider style="background: var(--line)" />
	</v-list>
</template>
