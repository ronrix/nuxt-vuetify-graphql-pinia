<script setup lang="ts">
import numeral from 'numeral'

const cartStore = useCart()
const emit = defineEmits(['update:cashModalEmit', 'update:selectedAmountEmit'])
const props = defineProps<{ cashModal: boolean; selectedAmount: number | null }>()
const amount = ref<number | null>(null)

const proceed = () => {
	// selected amount
	if (props.selectedAmount) {
		cartStore.directCheckout(props.selectedAmount).then(() => {
			emit('update:cashModalEmit', false)
		})
		return
	}
	// custom amount value
	if (amount.value) {
		cartStore.directCheckout(parseInt(String(amount.value))).then(() => {
			emit('update:cashModalEmit', false)
		})
	}
}
</script>
<template>
	<v-row justify="center">
		<v-dialog
			:model-value="props.cashModal"
			scrollable
			width="auto"
			@change="(e: Event) => emit('update:cashModalEmit', (e.target as any).value)"
		>
			<v-card>
				<v-card-title class="d-flex align-start">
					<div>
						<h5>Last check before checking out</h5>
						<p class="text-body-2">Orders</p>
					</div>
					<v-spacer />
					<v-btn class="pa-0" variant="text" @click="emit('update:cashModalEmit', false)">
						<v-icon icon="mdi-close" />
					</v-btn>
				</v-card-title>
				<v-divider />
				<v-card-text style="height: 300px" class="pa-0">
					<v-list lines="one">
						<v-list-item
							v-for="item in cartStore.carts"
							:key="item.id"
							:title="item.name"
							:subtitle="item.type"
							class="text-h6"
						/>
					</v-list>
				</v-card-text>
				<v-divider />
				<v-card-text class="font-weight-bold pa-2">
					<h4 class="d-flex align-center justify-space-between">
						<span>Total:</span>
						<span>{{ numeral(cartStore.subTotal).format('0.0a') }}</span>
					</h4>
					<h4
						:class="{
							'mt-2 d-flex justify-space-between': true,
							'align-center ': props.selectedAmount,
							'flex-column': !props.selectedAmount,
						}"
					>
						<span>Cash:</span>
						<span v-if="props.selectedAmount">₱{{ props.selectedAmount }}</span>
						<v-text-field
							v-if="!props.selectedAmount"
							v-model="amount"
							label="Amount"
							variant="outlined"
							focused
							:rules="[(v: any) => !!v || 'Please input amount before saving']"
						/>
					</h4>
				</v-card-text>
				<v-divider />
				<v-card-actions>
					<v-btn color="info" variant="outlined" block @click="proceed">Proceed</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-row>
</template>
