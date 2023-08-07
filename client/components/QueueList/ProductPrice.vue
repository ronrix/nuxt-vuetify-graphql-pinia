<script lang="ts" setup>
import numeral from 'numeral'

const props = defineProps<{
	id: string
	qty: number
	price: number
}>()
</script>
<template>
	<div class="d-flex justify-space-between text-uppercase mt-2">
		<UiQtyBtns :id="props.id" :qty="props.qty" />
		<h3>${{ numeral(props.price).format('0.0a') }}</h3>
	</div>
</template>
