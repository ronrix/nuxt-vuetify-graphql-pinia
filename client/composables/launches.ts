interface ILaunch {
	id: String
	details: String
	mission_name: String
	launch_date_utc: Date
	launch_site: {
		site_name
	}
	rocket: {
		rocket_name: String
	}
}

export const useLaunches = async (lastLaunchDataRef) => {
	const query = gql`
		query getLaunches($limit: Int, $offset: Int, $sort: String) {
			launches(limit: $limit, offset: $offset, sort: $sort) {
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
	const limit = ref(10)
	const scrollLoading = ref(false)
	const { data, pending } = await useAsyncQuery<{
		launches: ILaunch
	}>(query, { limit: 10 })

	const launches = ref<ILaunch | []>(data.value?.launches ?? [])

	// function to filter launches
	const filterLaunches = (year: string | number) => {
		// return all data
		if (year === 'All') {
			launches.value = data.value?.launches ?? []
			return
		}

		// filter data
		launches.value = data.value?.launches?.filter(
			(l: ILaunch) => year === new Date(l.launch_date_utc).getFullYear(),
		)
	}

	// sort the launches state
	const sortLaunches = (sortBy: string) => {
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

	function handleSelected(value: string | number) {
		filterLaunches(value)
	}

	// add launch rocket to favorites lists
	const store = useFavoriteRockets()
	function addToFavorites(id: string) {
		// get value from data
		const rocket = data.value?.launches?.find((launch: ILaunch) => launch.id === id)
		const _data = {
			mission: rocket.mission_name,
			name: rocket.rocket.rocket_name,
			id: rocket.id,
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

	// listen for intersection observer api for the last launch data to query new data
	async function fetchDataOnScroll(entries: any) {
		scrollLoading.value = true
		limit.value += 10
		if (entries[0].isIntersecting) {
			const { data: newData } = await useAsyncQuery<{
				launches: ILaunch
			}>(query, { limit: 10 })

			launches.value = [...launches.value, ...newData.value.launches]
			scrollLoading.value = false

			// check if ref is more than 1, then remove the first element
			// and remove the observer
			if (lastLaunchDataRef.value.length > 1) {
				observer.unobserve(lastLaunchDataRef.value[0].$el)
				lastLaunchDataRef.value = lastLaunchDataRef.value.splice(1)
			}
		}
	}

	watch(lastLaunchDataRef, () => {
		if (lastLaunchDataRef.value) {
			observer = new IntersectionObserver(fetchDataOnScroll)
			observer.observe(lastLaunchDataRef.value[0].$el)
		}
	})

	return {
		launches,
		pending,
		scrollLoading,
		sortLaunches,
		generateYears,
		handleSelected,
		addToFavorites,
		isFavorite,
	}
}
