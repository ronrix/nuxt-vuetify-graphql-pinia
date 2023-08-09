<script lang="ts" setup>
const table = ref<string | null>(null)
const emit = defineEmits<{ (e: 'update:tableName', value: string): void }>()
const tableData = [
	'Table 1',
	'Table 2',
	'Table 3',
	'Table 4',
	'Table 5',
	'Table 6',
	'Table 7',
	'Table 8',
	'Table 9',
	'Table 10',
	'Table 11',
]

const onClose = (isActive: Ref) => {
	table.value = null
	isActive.value = false
}

const onSave = (isActive: Ref) => {
	emit('update:tableName', table.value as string)
	isActive.value = false
}
</script>
<template>
	<v-col cols="auto" class="pa-0">
		<v-dialog transition="dialog-top-transition" width="500" scrollable>
			<template #activator="{ props }">
				<v-btn
					variant="outlined"
					class="mt-2 d-flex justify-space-between"
					block
					style="color: #93939c"
					v-bind="props"
				>
					{{ table || 'Select Table' }}
					<template #append>
						<v-icon icon="mdi-chevron-right" size="large" />
					</template>
				</v-btn>
			</template>
			<template #default="{ isActive }">
				<v-card>
					<v-toolbar class="pa-2" color="white">
						<v-app-bar-nav-icon>
							<v-chip
								rounded
								style="background-color: var(--light-primary); height: 40px; width: 40px"
								class="d-flex align-center justify-center"
							>
								<v-icon icon="mdi-table-furniture" style="color: var(--primary)" />
							</v-chip>
						</v-app-bar-nav-icon>
						<v-toolbar-title>
							<h5 class="ma-0 pa-0">Select Table</h5>
							<h6 class="ma-0 pa-0 font-weight-thin">Select customer table</h6>
						</v-toolbar-title>
						<v-spacer />
						<v-btn size="sm" rounded="lg" class="border pa-1" @click="isActive.value = false">
							<v-icon icon="mdi-close" />
						</v-btn>
					</v-toolbar>
					<v-divider />
					<v-card-title>Select Country</v-card-title>
					<v-divider />
					<v-card class="overflow-auto border" height="300">
						<v-card-text style="height: 300px">
							<v-radio-group v-model="table" column>
								<v-hover
									v-for="(value, id) in tableData"
									:key="id"
									v-slot="{ isHovering, props }"
								>
									<v-card
										:label="value"
										block
										variant="text"
										v-bind="props"
										class="text-capitalize my-1 rounded rounded-md prevent-select d-flex justify-space-between"
										:style="{
											border: isHovering
												? '1px solid var(--primary)'
												: table === value
												? '1px solid var(--primary)'
												: '1px solid grey',
											cursor: 'pointer',
										}"
										@click="table = value"
									>
										<v-radio :label="value" :value="value" color="info" />
									</v-card>
								</v-hover>
							</v-radio-group>
						</v-card-text>
					</v-card>
					<v-card-actions>
						<v-btn color="blue-darken-1" variant="text" @click="onClose(isActive)">Close</v-btn>
						<v-btn color="blue-darken-1" variant="text" @click="onSave(isActive)">Save</v-btn>
					</v-card-actions>
				</v-card>
			</template>
		</v-dialog>
	</v-col>
</template>
