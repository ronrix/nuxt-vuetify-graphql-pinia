import { IShip } from '../stores/useCart'

export const useShips = () => {
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

	const { data, pending: loading, error } = useAsyncQuery<{ ships: IShip[] }>(shipsQuery, { limit: 10 })
	const ships = computed(() => data.value?.ships ?? [])

	// methods
	function addToCart(ship: IShip) {
		cartStore.addCart({ ...ship, qty: 1, price: 5000000 })
	}

	return { ships, loading, error, addToCart, isListView }
}
