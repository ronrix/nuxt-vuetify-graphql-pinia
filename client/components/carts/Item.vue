<script setup lang="ts">
import { Transact } from '@/types/'

const cartStore = useCart()
const props = defineProps<{ item: Transact }>()
</script>
<template>
	<v-list-item>
		<div class="d-flex flex-row justify-space-between">
			<div class="v-col-auto ml-5">
				<v-chip
					:color="
						props.item.status === 'cancelled'
							? 'red'
							: props.item.status === 'completed'
							? 'green'
							: 'info'
					"
					class="text-overline text-capitalize"
					size="x-small"
				>
					{{ props.item.status }}
				</v-chip>
				<h4 class="text-uppercase">{{ props.item.table }}</h4>
				<h5>Customer name: {{ props.item.customerName }}</h5>
				<p class="d-flex align-end">
					Total:
					<UiDollarBill class="ma-0 pa-0 ml-2" style="font-size: 12px !important" />
					{{ props.item.totalPrice }}
				</p>
			</div>
			<div v-if="props.item.status === 'queue'" class="v-col-2">
				<v-btn
					variant="tonal"
					block
					color="red"
					@click="cartStore.cancelOrder(props.item.customerName)"
				>
					Cancel
				</v-btn>
				<v-btn
					variant="tonal"
					block
					color="green"
					class="mt-2"
					@click="cartStore.completeOrder(props.item.customerName)"
				>
					Complete
				</v-btn>
			</div>
		</div>
		<v-expansion-panels variant="popout" class="mt-2">
			<v-expansion-panel>
				<v-expansion-panel-title class="font-weight-bold">Orders</v-expansion-panel-title>
				<v-expansion-panel-text>
					<p v-for="order in props.item.orders" :key="order.id">{{ order.name }}</p>
				</v-expansion-panel-text>
			</v-expansion-panel>
		</v-expansion-panels>
		<v-divider class="mt-2" />
	</v-list-item>
</template>
