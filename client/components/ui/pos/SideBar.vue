<script setup lang="ts">
import numeral from 'numeral'

const cartStore = useCart()
</script>
<template>
	<v-navigation-drawer :width="400" class="text-grey-lighten-5" style="border-right: 1px solid #4b4d51">
		<v-list>
			<v-list-item class="ma-2">
				<div class="d-flex align-center">
					<v-icon icon="mdi-ferry text-h4 mr-3" style="color: #37ad8a" />
					<h1 class="text-h4 font-weight-bold">Ships Store</h1>
				</div>
			</v-list-item>
			<v-divider />
			<v-list-item color="#93939C">
				<h5 class="text-overline font-weight-bold">
					<v-icon icon="mdi-cart-variant" class="text-orange-lighten-2 mr-2" />
					Products
				</h5>
			</v-list-item>
			<v-divider />
		</v-list>
		<section class="overflow-auto px-3 mt-3 h-75">
			<h6
				v-if="!cartStore.carts.length"
				class="text-center d-flex flex-column align-center font-weight-bold text-h6"
			>
				<v-icon icon="mdi-cart-off" class="text-h3 text-grey-lighten-1" />
				No products selected
			</h6>
			<UiCheckoutProduct v-for="cart in cartStore.carts" v-else :key="cart.id" :cart="cart" />
		</section>

		<template #append>
			<v-divider />
			<div class="pa-2">
				<h6 class="text-caption font-weight-black text-grey-lighten-1 d-flex justify-space-between">
					<span>Discount:</span>
					<span>{{ cartStore.discountPercentage }}%</span>
				</h6>
				<h6 class="text-caption font-weight-black text-grey-lighten-1 d-flex justify-space-between">
					<span>Sub Total:</span>
					<span>${{ numeral(cartStore.subTotal).format() }}</span>
				</h6>
				<h6 class="text-h6 font-weight-black mb-2 d-flex justify-space-between">
					<span>Total:</span>
					<span>${{ numeral(cartStore.totalPrice).format() }}</span>
				</h6>

				<v-btn
					block
					:disabled="!cartStore.isReadyToProcess"
					size="x-large"
					class="mb-3"
					color="blue-darken-1"
					@click="cartStore.checkoutCart"
				>
					Checkout
				</v-btn>
				<v-btn :disabled="!cartStore.isReadyToProcess" block variant="outlined" size="x-large">
					Dine In
				</v-btn>
			</div>
		</template>
	</v-navigation-drawer>
</template>
