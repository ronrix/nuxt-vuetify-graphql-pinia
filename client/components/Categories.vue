<script lang="ts" setup>
const props = defineProps<{ changeCategory: (categoryIdx: number) => void }>()

const { categories } = useCategories()
const activeCategory = ref<string>(categories[0])

const onClick = (category: string, idx: number) => {
	props.changeCategory(idx)
	activeCategory.value = category
}
</script>
<template>
	<v-sheet class="mx-auto">
		<v-slide-group show-arrows>
			<v-slide-group-item v-for="(category, idx) in categories" :key="idx">
				<v-btn
					class="ma-2"
					rounded
					:color="category === activeCategory ? 'info' : undefined"
					@click="onClick(category, idx)"
				>
					{{ category }}
				</v-btn>
			</v-slide-group-item>
		</v-slide-group>
	</v-sheet>
</template>
