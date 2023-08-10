<script setup lang="ts">
import numeral from 'numeral'

const drawer = inject('drawer')
const contentToScroll = ref<HTMLElement | null>(null)
const cartStore = useCart()
const show = ref<boolean>(false)
const customerName = ref<string>('')
const table = ref<string | null>(null)

const processTransaction = () => {
	cartStore.checkoutCart(customerName.value, table.value).then(() => {
		customerName.value = ''
		table.value = null
	})
}

// this keeps the auto-scroll to bottom on reload
onMounted(() => {
	if (contentToScroll.value) {
		contentToScroll.value?.$el?.scrollTo({
			left: 0,
			top: contentToScroll.value.$el.scrollHeight,
			behavior: 'smooth',
		})
	}
})

watch([cartStore], () => {
	/*
		Adding setTimeout(0ms) keeps the scroll to the bottom.
		With no setTimeout it just scrolls like half of the scrollHeight and not scrolling to the bottom
	*/
	setTimeout(() => {
		contentToScroll.value?.$el?.scrollTo({
			left: 0,
			top: contentToScroll.value.$el.scrollHeight,
			behavior: 'smooth',
		})
	}, 0)
})
</script>
<template>
	<v-navigation-drawer
		v-model="drawer"
		location="right"
		:width="500"
		style="border-left: 2px solid var(--line)"
		class="px-4 overflow-y-hidden"
	>
		<v-list>
			<v-list-item color="#93939C" class="mb-2 pa-0">
				<h3 class="font-weight-bold">Customer Information</h3>
				<v-text-field
					v-model="customerName"
					label="Customer Name"
					variant="outlined"
					class="mt-2"
					style="border-radius: 20px"
				/>
				<SelectTable v-model="show" v-model:tableName="table" :table="table" :show="show" />
			</v-list-item>
			<v-divider style="background: var(--line)" />
		</v-list>
		<h3 class="font-weight-bold mb-3 pa-2">Order Details</h3>
		<v-list ref="contentToScroll" class="overflow-y-auto" height="65%">
			<v-list-item color="#93939C">
				<UiErrorMsg v-if="!cartStore.carts.length">
					<v-icon icon="mdi-cart-off" class="text-h4" style="color: #f14634" />
					<span class="text-grey-darken-1">No orders selected</span>
				</UiErrorMsg>
				<QueueList v-for="cart in cartStore.carts" v-else :key="cart.id" :cart="cart" />
			</v-list-item>
		</v-list>

		<template #append>
			<v-divider style="background: var(--line)" />
			<section class="py-3">
				<h3>Order Summary</h3>
				<div
					class="pa-3 mt-3 rounded rounded-lg"
					style="background: var(--light-grey-2); border-bottom: 3px dashed #797979"
				>
					<div class="font-weight-black text-grey-darken-1 d-flex justify-space-between">
						<h4>Sub Total</h4>
						<h4>${{ numeral(cartStore.subTotal).format() }}</h4>
					</div>
				</div>
			</section>

			<CashBtns />
			<v-btn
				block
				size="sm"
				:disabled="!customerName.length && !table"
				class="my-3 text-capitalize font-weight-bold pa-3 rounded rounded-lg"
				style="background: #084eff; color: var(--light-grey)"
				@click="processTransaction"
			>
				Process Transaction
			</v-btn>
		</template>
	</v-navigation-drawer>
</template>
<style>
.v-text-field .v-input__details {
	display: none;
}
</style>
