<script lang="ts" setup>
const amounts = [20, 50, 100, 200, 500, 1000]
const cartStore = useCart()
const selectedAmount = ref<number | null>(null)
const cashModal = ref<boolean>(false)

const selectCashModal = (amount: number | null) => {
	cashModal.value = true
	selectedAmount.value = amount
}
</script>
<template>
	<v-container class="text-center pa-0 ma-0">
		<v-row justify="center" class="pa-0 ma-0">
			<v-col v-for="(amount, idx) in amounts" :key="idx" cols="12" sm="6" md="4" class="ma-0 pa-0">
				<v-btn
					block
					rounded
					size="small"
					variant="outlined"
					color="info"
					class="ma-0 pa-0"
					:disabled="!cartStore.orders.length"
					@click="selectCashModal(amount)"
				>
					{{ amount }}
				</v-btn>
			</v-col>
			<v-col cols="12" sm="6" md="4" class="ma-0 pa-0">
				<v-btn
					block
					rounded
					size="small"
					variant="outlined"
					color="yellow-darken-1"
					class="ma-0 pa-0"
					:disabled="!cartStore.orders.length"
					@click="selectCashModal(null)"
				>
					custom
				</v-btn>
			</v-col>
		</v-row>
		<CheckoutModal
			v-model:cashModalEmit="cashModal"
			v-model:selectedAmountEmit="selectedAmount"
			:cash-modal="cashModal"
			:selected-amount="selectedAmount"
		/>
	</v-container>
</template>
