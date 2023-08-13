<script setup lang="ts">
const drawer = inject('drawer')
const contentToScroll = ref<HTMLDivElement | null>(null)
const cartStore = useCart()

// this keeps the auto-scroll to bottom on reload
onMounted(() => {
	if (contentToScroll.value) {
		;(contentToScroll.value as any).$el?.scrollTo({
			left: 0,
			top: (contentToScroll.value as any).$el.scrollHeight,
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
		;(contentToScroll.value as any).$el?.scrollTo({
			left: 0,
			top: (contentToScroll.value as any).$el.scrollHeight,
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
		<OrderCustomerInformation />

		<h3 class="font-weight-bold mb-3 pa-2">Order Details</h3>
		<v-list ref="contentToScroll" class="overflow-y-auto" height="65%">
			<v-list-item color="#93939C">
				<UiErrorMsg v-if="!cartStore.orders.length">
					<v-icon icon="mdi-cart-off" class="text-h4" style="color: #f14634" />
					<span class="text-grey-darken-1">No orders selected</span>
				</UiErrorMsg>
				<OrderList v-for="order in cartStore.orders" v-else :key="order.id" :order="order" />
			</v-list-item>
		</v-list>

		<template #append>
			<v-divider style="background: var(--line)" />
			<OrderSummary />

			<CashBtns />
			<v-btn
				block
				size="sm"
				:disabled="!cartStore.canProcess"
				class="my-3 text-capitalize font-weight-bold pa-3 rounded rounded-lg"
				style="background: #084eff; color: var(--light-grey)"
				@click="cartStore.checkoutCart"
			>
				Process Transaction
			</v-btn>
		</template>
	</v-navigation-drawer>
</template>
