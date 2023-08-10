<script lang="ts" setup>
const props = defineProps<{ changeCategory: (categoryIdx: number) => void }>()

const categories = [
	'Category 1',
	'Category 2',
	'Category 3',
	'Category 4',
	'Category 5',
	'Category 6',
	'Category 7',
]
const activeCategory = ref<string>(categories[0])

const onClick = (category: string, idx: number) => {
	props.changeCategory(idx)
	activeCategory.value = category
}
</script>
<template>
	<v-tabs
		rounded
		class="py-1 px-3 rounded rounded-xl"
		style="background-color: var(--light-grey-2)"
		slider-color="transparent"
	>
		<v-tab
			v-for="(category, idx) in categories"
			:key="idx"
			rounded
			:class="{ 'bg-white': category === activeCategory }"
			@click="onClick(category, idx)"
		>
			{{ category }}
		</v-tab>
	</v-tabs>
</template>
<style lang="scss" scoped>
.v-list {
	background: rgb(37 38 43 / 90%) !important;
}
</style>
