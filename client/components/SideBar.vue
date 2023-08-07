<script setup lang="ts">
import numeral from 'numeral'

const contentToScroll = ref<HTMLElement | null>(null)
const cartStore = useCart()

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
			top: contentToScroll.value.$el.scrollHeight + contentToScroll.value.$el.scrollHeight,
			behavior: 'smooth',
		})
	}, 0)
})
</script>
<template>
	<v-navigation-drawer
		permanent
		location="right"
		:width="500"
		style="border-left: 2px solid var(--line)"
		class="px-2"
	>
		<v-list>
			<v-list-item color="#93939C">
				<h3 class="font-weight-bold mb-2">Customer Information</h3>
				<v-text-field
					label="Customer Name"
					persistent-hint
					variant="outlined"
					style="border-radius: 20px"
				/>
			</v-list-item>
			<v-divider style="background: var(--line)" />
		</v-list>
		<h3 class="font-weight-bold mb-3 pa-2">Order Details</h3>
		<v-list ref="contentToScroll" class="overflow-y-auto" style="height: 70%">
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
						<h5>Sub Total</h5>
						<h5>${{ numeral(cartStore.subTotal).format() }}</h5>
					</div>
				</div>
			</section>
			<v-btn
				block
				size="sm"
				:disabled="!cartStore.isReadyToProcess"
				class="my-3 text-capitalize font-weight-bold pa-3 rounded rounded-lg"
				style="background: #084eff; color: var(--light-grey)"
				@click="cartStore.checkoutCart"
			>
				Process Transaction
			</v-btn>
		</template>
	</v-navigation-drawer>
</template>
