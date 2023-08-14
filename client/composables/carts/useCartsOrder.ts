import { Transact } from '@/types/'

export const useCartsOrder = () => {
	const tab = ref<number>(1)
	const cartStore = useCart()

	// get 'in queue' carts
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

	// get 'cancelled' carts
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

	// get 'completed' carts
	const completedOrders = computed(() => {
		const res: Transact[] = []
		const carts = cartStore.carts
		for (const key in carts) {
			if (key === 'default') {
				carts.default?.forEach((cart) => {
					if (cart.status === 'completed') {
						res.push({ ...cart, table: key })
					}
				})
			}

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

	return { data, tab }
}
