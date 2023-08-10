<script setup lang="ts">
const { ships, addToCart, isListView, changeCategory, loading } = useProducts()
</script>
<template>
	<main>
		<section style="border-bottom: 1px solid var(--line)">
			<Categories :change-category="changeCategory" />
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

		<div v-if="loading" class="text-center mt-5">
			<v-progress-circular indeterminate color="info" />
		</div>
		<Products
			v-else-if="ships.length"
			:ships="ships"
			:add-to-cart="addToCart"
			:is-list-view="isListView"
		/>
		<UiErrorMsg v-else class="mt-5" style="color: var(--dark-grey)">
			<v-icon icon="mdi-close-circle-outline" class="text-h3" />
			<h4 class="font-weight-thin">No products for this category</h4>
		</UiErrorMsg>
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
