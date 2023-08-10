<script lang="ts" setup>
const amounts = [20, 50, 100, 200, 500, 1000]
const cartStore = useCart()
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
					:disabled="!cartStore.carts.length"
					@click="cartStore.directCheckout(amount)"
				>
					{{ amount }}
				</v-btn>
			</v-col>
		</v-row>
	</v-container>
</template>
