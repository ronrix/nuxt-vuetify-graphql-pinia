<script setup lang="ts">
const { ships, addToCart, isListView } = useProducts()
</script>
<template>
	<main>
		<section style="border-bottom: 1px solid var(--line)">
			<v-tabs
				rounded
				class="py-1 px-3 rounded rounded-xl"
				style="background-color: var(--light-grey-2)"
				slider-color="transparent"
			>
				<v-tab rounded>American Ship</v-tab>
				<v-tab rounded>Go Ms</v-tab>
				<v-tab rounded>Shannon</v-tab>
				<v-tab rounded>
					<v-icon icon="mdi-dots-horizontal" />
				</v-tab>
			</v-tabs>
			<div class="d-flex align-center justify-space-between mt-3">
				<h4 style="font-size: 1.5em" class="d-flex align-center">
					Menu
					<span class="text-caption ml-3 font-weight-bold">{{ ships.length }} items</span>
				</h4>
				<v-checkbox-btn
					v-model="isListView"
					class="pe-2"
					label="List view"
					color="info"
					style="font-size: 13px"
				/>
			</div>
		</section>

		<Products :ships="ships" :add-to-cart="addToCart" :is-list-view="isListView" />
	</main>
</template>
<style scoped>
.v-tabs {
	height: auto;
}
.v-tab {
	text-transform: capitalize;
	font-weight: 600;
	font-family: 'Poppins', sans-serif;
	color: var(--dark-grey);
}
.v-tab--selected {
	background: #ffff;
	color: var(--dark);
}
.v-label {
	font-size: 12px !important;
}
</style>
