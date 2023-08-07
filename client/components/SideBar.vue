<script setup lang="ts">
import numeral from 'numeral'

const cartStore = useCart()
</script>
<template>
	<v-navigation-drawer
		permanent
		location="right"
		:width="500"
		style="border-left: 2px solid var(--line); padding: 0 1em"
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
		<v-list>
			<v-list-item color="#93939C">
				<h3 class="font-weight-bold">Order Details</h3>
			</v-list-item>
		</v-list>
		<section>
			<UiErrorMsg v-if="!cartStore.carts.length">
				<v-icon icon="mdi-cart-off" class="text-h4" style="color: #f14634" />
				<span class="text-grey-darken-1">No orders selected</span>
			</UiErrorMsg>
			<QueueList v-for="cart in cartStore.carts" v-else :key="cart.id" :cart="cart" />
		</section>

		<template #append>
			<v-divider style="background: var(--line)" />
			<section class="pa-2">
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

				<v-btn
					block
					size="sm"
					:disabled="!cartStore.isReadyToProcess"
					class="my-3 text-capitalize font-weight-bold pa-3"
					style="background: #084eff; color: var(--light-grey)"
					@click="cartStore.checkoutCart"
				>
					Process Transaction
				</v-btn>
			</section>
		</template>
	</v-navigation-drawer>
</template>
