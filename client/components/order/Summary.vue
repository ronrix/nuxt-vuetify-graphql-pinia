<script lang="ts" setup>
import numeral from 'numeral'
const { subTotal } = useCart()
</script>
<template>
	<section class="py-3">
		<h3>Order Summary</h3>
		<div
			class="pa-3 mt-3 rounded rounded-lg"
			style="background: var(--light-grey-2); border-bottom: 3px dashed #797979"
		>
			<div class="font-weight-black text-grey-darken-1 d-flex justify-space-between">
				<h4>Sub Total</h4>
				<h4>${{ numeral(subTotal).format() }}</h4>
			</div>
		</div>
	</section>
</template>
