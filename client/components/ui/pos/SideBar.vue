<script setup lang="ts">
const cartStore = useCart()
</script>
<template>
	<v-navigation-drawer :width="400" permanent class="text-grey-lighten-5">
		<v-list>
			<v-list-item class="ma-2">
				<div class="d-flex align-center">
					<v-icon icon="mdi-rocket-launch text-h4 mr-3 text-red-darken-3" />
					<h1 class="text-h4">Spaceship Store</h1>
				</div>
			</v-list-item>
			<v-divider />
			<v-list-item color="#93939C">
				<h5>
					<v-icon icon="mdi-cart-variant" />
					Products
				</h5>
			</v-list-item>
			<v-divider />
		</v-list>
		<section class="overflow-auto px-3 mt-3 h-75 no-scrollbar">
			<p v-if="!cartStore.carts?.length" class="text-center">
				<v-icon icon="mdi-cart-off" />
				No products selected
			</p>
			<UiCheckoutProduct v-for="cart in cartStore.carts" v-else :key="cart.id" :cart="cart" />
		</section>

		<template #append>
			<v-divider />
			<div class="pa-2">
				<h6 class="text-caption font-weight-black text-grey-lighten-1 d-flex justify-space-between">
					<span>Discount:</span>
					<span>{{ cartStore.discount * 100 }}%</span>
				</h6>
				<h6 class="text-caption font-weight-black text-grey-lighten-1 d-flex justify-space-between">
					<span>Sub Total:</span>
					<span>${{ new Intl.NumberFormat().format(cartStore.subTotal) }}</span>
				</h6>
				<h6 class="text-h6 font-weight-black mb-2 d-flex justify-space-between">
					<span>Total:</span>
					<span>
						${{ new Intl.NumberFormat().format(cartStore.subTotal * cartStore.discount) }}
					</span>
				</h6>

				<v-btn
					block
					variant="tonal"
					size="x-large"
					class="mb-3"
					color="blue-darken-1"
					@click="cartStore.checkoutCart"
				>
					Checkout
				</v-btn>
				<v-btn block variant="tonal" size="x-large">Dine In</v-btn>
			</div>
		</template>
	</v-navigation-drawer>
</template>
<style scoped>
nav.v-navigation-drawer {
	background-color: transparent !important;
}
</style>
