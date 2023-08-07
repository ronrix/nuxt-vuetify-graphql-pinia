import { IShip } from '@/types/'

export const useProducts = () => {
	const isListView = ref<boolean>(false)
	const cartStore = useCart()
	const shipsQuery = gql`
		query Ships($limit: Int) {
			ships(limit: $limit) {
				id
				name
				type
				image
			}
		}
	`

	const { data, pending: loading, error } = useAsyncQuery<{ ships: IShip[] }>(shipsQuery, { limit: 15 })
	const ships = computed(() => {
		if (data.value?.ships) {
			return data.value?.ships.map((ship) => {
				return {
					...ship,
					price: 5000,
				}
			})
		}
		return []
	})

	// methods
	function addToCart(ship: IShip) {
		cartStore.addCart({ ...ship, qty: 1 })
	}

	return { ships, loading, error, addToCart, isListView }
}
