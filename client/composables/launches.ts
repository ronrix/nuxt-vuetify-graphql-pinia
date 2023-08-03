type ILaunch = {
	id: String
	details: String
	mission_name: String
	launch_date_utc: Date
	launch_site: {
		site_name: String
	}
	rocket: {
		rocket_name: String
	}
}

export const useLaunches = async (lastLaunchDataRef: Ref<HTMLDivElement | null>) => {
	onBeforeMount(() => {
		if (lastLaunchDataRef.value) {
			observer = new IntersectionObserver(fetchDataOnScroll, { root: null, threshold: 0.5 })
			observer.observe(lastLaunchDataRef.value)
		}
	})

	const query = gql`
		query getLaunches($find: LaunchFind, $limit: Int, $offset: Int, $sort: String) {
			launches(find: $find, limit: $limit, offset: $offset, sort: $sort) {
				id
				details
				mission_name
				launch_date_utc
				launch_site {
					site_name
				}
				rocket {
					rocket_name
				}
			}
		}
	`

	let observer: any = null
	const limit = ref<number>(10)
	const loading = ref<boolean>(true)
	const {
		result: data,
		loading: pending,
		refetch,
	} = await useQuery<{
		launches: ILaunch[]
	}>(query, { limit: limit.value })
	loading.value = pending.value

	const launches = ref<ILaunch[] | []>(data.value?.launches ?? [])

	// function to filter launches
	async function filterLaunches(year: string | number) {
		loading.value = true
		// return all data
		if (typeof year === 'string' && year === 'All') {
			launches.value = data.value?.launches ?? []
			loading.value = false
			return
		}

		// filter data
		const {
			data: result,
			pending,
			error,
		} = await useAsyncQuery<{
			launches: ILaunch[]
		}>(query)

		loading.value = pending.value
		if (!error.value && result.value) {
			launches.value = result.value?.launches
				?.filter((l: ILaunch) => year === new Date(l.launch_date_utc).getFullYear())
				.slice(0, 9) as ILaunch[]
			return
		}
		launches.value = []
	}

	// sort the launches state
	function sortLaunches(sortBy: string) {
		if (sortBy === 'ASC') {
			launches.value?.sort(
				(a, b) => new Date(a.launch_date_utc).getTime() - new Date(b.launch_date_utc)?.getTime(),
			)
		} else {
			launches.value?.sort(
				(a, b) => new Date(b.launch_date_utc).getTime() - new Date(a.launch_date_utc)?.getTime(),
			)
		}
	}

	// generate years from 2000 to current year
	function generateYears(startYear?: number) {
		const currentYear = new Date().getFullYear()
		startYear = startYear || 2000
		const years = []

		while (startYear <= currentYear) {
			years.push(startYear++)
		}

		years.sort((a, b) => b - a) // sort in descending order
		// add 'all' on first value for selecting all data
		years.unshift('All')
		return years
	}

	async function handleSelected(value: number) {
		await filterLaunches(value)
	}

	// add launch rocket to favorites lists
	const store = useFavoriteRockets()
	function addToFavorites(id: string) {
		// get value from data
		const rocket = data.value?.launches?.find((launch: ILaunch) => launch.id === id)
		const _data = {
			mission: rocket?.mission_name,
			name: rocket?.rocket.rocket_name,
			id: rocket?.id,
		}
		store.addRocket(_data)
	}

	// check if launch is in the list of favorite rockets
	function isFavorite(id: string) {
		if (!id) return

		const rocket = store.getRockets.find((rocket: ILaunch) => rocket.id === id)
		if (rocket) return true
		return false
	}

	// listen for intersection observer api for the loading element below the launches data elements
	// this will trigger re-fetching the data for infinite scrolling
	async function fetchDataOnScroll(entries: any) {
		if (entries[0].isIntersecting) {
			await refetch({ limit: limit.value, offset: limit.value - 10 })

			if (data.value?.launches) {
				launches.value = [...launches.value, ...data.value?.launches] // append the new value to the reactive state
			}
		}
		limit.value += 10
	}

	watch(
		[lastLaunchDataRef],
		() => {
			if (lastLaunchDataRef.value) {
				observer = new IntersectionObserver(fetchDataOnScroll, { root: null, threshold: 0.5 })
				observer.observe(lastLaunchDataRef.value)
			}
		},
		{
			immediate: false,
		},
	)

	return {
		launches,
		loading,
		sortLaunches,
		generateYears,
		handleSelected,
		addToFavorites,
		isFavorite,
	}
}
