<script setup lang="ts">
import { ProductCustomization } from '@/types/index'
const cartStore = useCart()
const options = ref<ProductCustomization>({
	color: '',
	description: '',
	size: 'small',
})

const props = defineProps<{
	show: boolean
	productQty: number
	customization: any
	productImg: string
	productId: string
}>()

const emit = defineEmits<{
	(e: 'update:modelValue', value: boolean): void
}>()

const saveCustomization = () => {
	emit('update:modelValue', false)
	cartStore.addProductCustomizations(options.value, props.productId)
}
</script>
<template>
	<v-dialog v-model="props.show" persistent width="500">
		<v-card>
			<v-card-title class="d-flex align-center">
				<span class="text-h5">Product Customization</span>
				<v-spacer />
				<v-icon icon="mdi-close" style="cursor: pointer" @click="emit('update:modelValue', false)" />
			</v-card-title>
			<v-divider />
			<v-card-text>
				<v-container class="d-flex">
					<v-row>
						<v-col cols="3" class="ma-2 pa-0">
							<ProductsImg :img="productImg" />
							<UiQtyBtns :id="productId" :qty="productQty" class="mt-3" />
						</v-col>
						<v-col class="pa-0">
							<v-col cols="12">
								<v-select
									v-model="options.color"
									variant="outlined"
									:items="props.customization.colors"
									label="Size"
								/>
							</v-col>
							<v-col>
								<v-select
									v-model="options.size"
									variant="outlined"
									:items="props.customization.sizes"
									label="Size"
								/>
							</v-col>
							<v-col cols="12">
								<v-text-field
									v-model="options.description"
									label="Description"
									variant="outlined"
								/>
							</v-col>
						</v-col>
					</v-row>
				</v-container>
			</v-card-text>
			<v-card-actions>
				<v-spacer />
				<v-btn color="red" variant="tonal" @click="cartStore.removeProduct(props.productId)">
					remove
				</v-btn>
				<v-btn color="blue-darken-1" variant="tonal" @click="saveCustomization">Save</v-btn>
				<v-spacer />
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>
