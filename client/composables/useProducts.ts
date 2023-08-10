import { IShip } from '@/types/'

export const useProducts = () => {
	const isListView = ref<boolean>(false)
	const cartStore = useCart()
	const shipsQuery = gql`
		query Ships($limit: Int, $offset: Int) {
			ships(limit: $limit, offset: $offset) {
				id
				name
				type
				image
			}
		}
	`

	const {
		result: data,
		loading,
		error,
		refetch,
	} = useQuery<{ ships: IShip[] }>(shipsQuery, () => ({ limit: 15, offest: 0 }))
	const ships = computed(() => {
		if (data.value?.ships) {
			return data.value?.ships.map((ship) => {
				return {
					...ship,
					price: 5000,
					customization: {
						colors: ['black', 'white'],
						sizes: ['x-small', 'small', 'medium', 'large', 'x-large'],
					},
				}
			})
		}
		return []
	})

	// methods
	function addToCart(ship: IShip) {
		cartStore.addCart({ ...ship, qty: 1 })
	}

	async function changeCategory(categoryIdx: number) {
		await refetch({ limit: 15, offset: categoryIdx * 15 + 1 })
	}

	return { ships, loading, error, addToCart, isListView, changeCategory }
}
