<script setup lang="ts">
import { ProductCustomization } from '@/types/index'
const cartStore = useCart()
const options = ref<ProductCustomization>({
	description: '',
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
	<v-dialog
		:model-value="props.show"
		persistent
		width="500"
		@change=" (e: Event) => 
		emit('update:modelValue', e.target?.value)
"
	>
		<v-card>
			<v-card-title class="d-flex align-center">
				<span class="text-h5">Product Customization</span>
				<v-spacer />
				<v-icon icon="mdi-close" style="cursor: pointer" @click="emit('update:modelValue', false)" />
			</v-card-title>
			<v-divider />
			<v-card-text>
				<v-form>
					<v-row>
						<v-col cols="3" class="ma-2 pa-0">
							<ProductsImg :img="productImg" />
							<UiQtyBtns :id="productId" :qty="productQty" class="mt-3" />
						</v-col>
						<v-col class="pa-0">
							<v-col cols="12" class="d-flex">
								<v-text-field
									v-model="options.fixAmount"
									focused
									label="Fix amount"
									variant="outlined"
								/>
								<v-text-field
									v-model="options.discount"
									label="Discount (%)"
									variant="outlined"
									class="ml-2"
								/>
							</v-col>
							<v-col cols="12">
								<v-text-field
									v-model="options.description"
									label="Description"
									variant="outlined"
								/>
							</v-col>
							<v-col v-for="(option, key) in props.customization" :key="key" cols="12">
								<!-- if option is array render a select-field -->
								<v-select
									v-if="Array.isArray(option)"
									v-model="options[key]"
									:items="option"
									label="Select"
									persistent-hint
									return-object
									single-line
								/>
								<!-- if option is not an array render a text-field -->
								<v-text-field
									v-if="!Array.isArray(option)"
									v-model="options[option]"
									:label="option"
									variant="outlined"
								/>
							</v-col>
						</v-col>
					</v-row>
				</v-form>
			</v-card-text>
			<v-card-actions>
				<v-spacer />
				<v-btn color="red" variant="tonal" @click="cartStore.removeProduct(props.productId)">
					remove
				</v-btn>
				<v-btn
					type="submit"
					color="blue-darken-1"
					variant="tonal"
					text="Submit"
					@click="saveCustomization"
				>
					save
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>
