import { IShip } from '@/types/'

export const useProducts = () => {
	const isListView = ref<boolean>(false)
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

	/*
		`useQuery` throws `hydration mismatch` warning
		reason of using `useQuery` because of refetch method
	*/
	const {
		result: data,
		loading,
		error,
		refetch,
	} = useQuery<{ ships: IShip[] }>(
		shipsQuery,
		() => ({ limit: 15, offest: 0 }),
		() => ({
			fetchPolicy: 'cache-first',
		}),
	)
	const ships = computed(() => {
		if (data.value?.ships) {
			return data.value?.ships.map((ship) => {
				return {
					...ship,
					price: 5000,
					customization: {
						// product options
						colors: ['black', 'white'],
						sizes: ['x-small', 'small', 'medium', 'large', 'x-large'],
					},
				}
			})
		}
		return []
	})

	// methods
	async function changeCategory(categoryIdx: number) {
		await refetch({ limit: 15, offset: categoryIdx * 15 + 1 })
	}

	return { ships, loading, error, isListView, changeCategory }
}
