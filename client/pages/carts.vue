<script setup lang="ts">
import { Transact } from '@/types'
const tab = ref<number>(1)
const cartStore = useCart()

// get on queue carts
const tableInQueue = computed(() => {
	const res: Transact[] = []
	const carts = cartStore.carts
	for (const key in carts) {
		if (key === 'default') continue
		if (carts[key].status === 'queue') {
			res.push({ ...carts[key], table: key })
		}
	}
	return res
})

const cancelledOrders = computed(() => {
	const res: Transact[] = []
	const carts = cartStore.carts
	for (const key in carts) {
		if (key === 'default') continue
		if (carts[key].status === 'cancelled') {
			res.push({ ...carts[key], table: key })
		}
	}
	return res
})

const completedOrders = computed(() => {
	const res: Transact[] = []
	const carts = cartStore.carts
	for (const key in carts) {
		if (key === 'default') continue
		if (carts[key].status === 'completed') {
			res.push({ ...carts[key], table: key })
		}
	}
	return res
})

const data = computed(() => {
	if (tab.value === 1) return tableInQueue.value
	if (tab.value === 2) return cancelledOrders.value
	if (tab.value === 3) return completedOrders.value
})
</script>
<template>
	<div>
		<v-tabs v-model="tab" color="info">
			<v-tab :value="1" class="font-weight-medium">
				<v-icon icon="mdi-human-queue" :color="tab === 1 ? 'info' : ''" class="mr-1" />
				Queue
			</v-tab>
			<v-tab :value="2" class="font-weight-medium">
				<v-icon icon="mdi-close-circle" :color="tab === 2 ? 'red' : ''" class="mr-1" />
				Cancelled
			</v-tab>
			<v-tab :value="3" class="font-weight-medium">
				<v-icon icon="mdi-check-circle" :color="tab === 3 ? 'green' : ''" class="mr-1" />
				Completed
			</v-tab>
		</v-tabs>
		<v-window v-model="tab">
			<v-window-item v-for="n in 3" :key="n" :value="n">
				<v-list lines="two">
					<UiErrorMsg v-if="!data?.length">
						<h5>No data is found!</h5>
					</UiErrorMsg>
					<v-sheet v-for="(item, id) in data" v-else :key="id">
						<v-list-item>
							<div class="d-flex flex-row justify-space-between">
								<div class="v-col-auto ml-5">
									<v-chip
										:color="
											item.status === 'cancelled'
												? 'red'
												: item.status === 'completed'
												? 'green'
												: 'info'
										"
										class="text-overline text-capitalize"
										size="x-small"
									>
										{{ item.status }}
									</v-chip>
									<h4 class="text-uppercase">{{ item.table }}</h4>
									<h5>Customer name: {{ item.customerName }}</h5>
									<p class="d-flex align-end">
										Total:
										<UiDollarBill
											class="ma-0 pa-0 ml-2"
											style="font-size: 12px !important"
										/>
										{{ item.totalPrice }}
									</p>
								</div>
								<div v-if="item.status === 'queue'" class="v-col-2">
									<v-btn
										variant="tonal"
										block
										color="red"
										@click="cartStore.cancelOrder(item.customerName)"
									>
										Cancel
									</v-btn>
									<v-btn
										variant="tonal"
										block
										color="green"
										class="mt-2"
										@click="cartStore.completeOrder(item.customerName)"
									>
										Complete
									</v-btn>
								</div>
							</div>
							<v-expansion-panels variant="popout" class="mt-2">
								<v-expansion-panel>
									<v-expansion-panel-title class="font-weight-bold">
										Orders
									</v-expansion-panel-title>
									<v-expansion-panel-text>
										<p v-for="order in item.orders" :key="order.id">{{ order.name }}</p>
									</v-expansion-panel-text>
								</v-expansion-panel>
							</v-expansion-panels>
							<v-divider class="mt-2" />
						</v-list-item>
					</v-sheet>
				</v-list>
			</v-window-item>
		</v-window>
	</div>
</template>
