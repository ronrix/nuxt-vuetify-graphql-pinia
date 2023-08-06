<script lang="ts" setup>
const items = [{ title: 'All' }, { title: 'Ship 1' }, { title: 'Ship 2' }, { title: 'Ship 3' }]
const category = ref<string>('all')
</script>
<template>
	<div class="d-flex justify-space-around px-3">
		<v-menu>
			<template #activator="{ props }">
				<v-btn v-bind="props" class="text-grey-lighten-5">
					{{ category }}
					<v-icon icon="mdi-chevron-down ml-3" />
				</v-btn>
			</template>
			<v-list class="bg-transparent text-grey-lighten-5">
				<v-list-item
					v-for="(item, index) in items"
					:key="index"
					:value="index"
					@click="category = item.title"
				>
					<v-list-item-title>{{ item.title }}</v-list-item-title>
				</v-list-item>
			</v-list>
		</v-menu>
	</div>
</template>
<style lang="scss" scoped>
.v-list {
	background: rgb(37 38 43 / 90%) !important;
}
</style>
