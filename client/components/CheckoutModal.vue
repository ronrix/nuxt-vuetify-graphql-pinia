<script setup lang="ts">
import numeral from 'numeral'

const cartStore = useCart()
const emit = defineEmits(['update:cashModalEmit', 'update:selectedAmountEmit'])
const props = defineProps<{ cashModal: boolean; selectedAmount: number | null }>()
const amount = ref<number | null>(null)
const error = ref<string>('')

const proceed = () => {
	// selected amount
	if (props.selectedAmount) {
		try {
			cartStore.directCheckout(props.selectedAmount)
			emit('update:cashModalEmit', false)
			error.value = ''
			amount.value = null
		} catch (e) {
			error.value = (e as Error).message
			amount.value = null
		}
		return
	}
	// custom amount value
	if (amount.value) {
		try {
			cartStore.directCheckout(parseInt(String(amount.value)))
			emit('update:cashModalEmit', false)
			error.value = ''
			amount.value = null
		} catch (e) {
			error.value = (e as Error).message
			amount.value = null
		}
	}
}

const proceedWithoutPayment = () => {
	cartStore.checkoutCart()
	emit('update:cashModalEmit', false)
}
</script>
<template>
	<v-row justify="center">
		<v-dialog
			:model-value="props.cashModal"
			scrollable
			width="auto"
			@change="emit('update:cashModalEmit', !props.cashModal)"
			@keydown.esc="emit('update:cashModalEmit', !props.cashModal)"
		>
			<v-form @submit.prevent>
				<v-card>
					<v-card-title class="d-flex align-start">
						<div>
							<h5>Last check before checking out</h5>
							<p class="text-body-2">Orders</p>
						</div>
						<v-spacer />
						<v-icon icon="mdi-close" class="ml-5" @click="emit('update:cashModalEmit', false)" />
					</v-card-title>
					<v-divider />
					<v-card-text style="max-height: 300px" class="pa-0">
						<v-list lines="one">
							<v-list-item
								v-for="item in cartStore.orders"
								:key="item.id"
								:title="item.name"
								:subtitle="item.type"
								class="text-h6"
							/>
						</v-list>
					</v-card-text>
					<v-divider />
					<v-card-text class="font-weight-bold pa-2">
						<p v-if="error.length" class="px-2 text-red-darken-4 bg-red-lighten-4">{{ error }}</p>
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
								autofocus
								hide-details
								:rules="[(v: any) => !!v || 'Please input amount before proceeding', (v: any) => v >= cartStore.subTotal || 'Please input amount greater than the sub total']"
							/>
						</h4>
					</v-card-text>
					<v-divider />
					<v-card-actions class="d-flex flex-column">
						<v-btn
							type="submit"
							:disabled="
								(props.selectedAmount && props.selectedAmount < cartStore.subTotal) ||
								(amount ? amount < cartStore.subTotal : true)
							"
							color="info"
							variant="outlined"
							block
							class="text-capitalize ma-0 pa-0"
							@click="proceed"
						>
							Checkout
						</v-btn>
						<v-btn
							:disabled="amount && !!amount"
							color="info"
							variant="outlined"
							block
							class="text-capitalize ma-0 pa-0 mt-2"
							@click="proceedWithoutPayment"
						>
							Proceed without payment
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-form>
		</v-dialog>
	</v-row>
</template>
