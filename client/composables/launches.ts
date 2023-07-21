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

export const useLaunches = () => {
	const query = gql`
		query getLaunches {
			launches {
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

	const { data } = useAsyncQuery<{
		launches: ILaunch
	}>(query)

	const launches = computed(() => data.value?.launches ?? [])
	const allLaunches = JSON.stringify(launches.value) // creates deep copy

	// function to filter launches
	const filterLaunches = (year: string | number) => {
		// return all data
		if (year === 'All') {
			data.value.launches = JSON.parse(allLaunches)
			return
		}

		// filter data
		data.value.launches = JSON.parse(allLaunches)?.filter(
			(l: ILaunch) => year === new Date(l.launch_date_utc).getFullYear(),
		)
	}

	// sort the launches state
	const sortLaunches = (sortBy: string) => {
		if (sortBy === 'ASC') {
			data.value.launches?.sort(
				(a, b) => new Date(a.launch_date_utc).getTime() - new Date(b.launch_date_utc)?.getTime(),
			)
		} else {
			data.value.launches?.sort(
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
		const rocket = JSON.parse(allLaunches).find((launch: ILaunch) => launch.id === id)
		const data = {
			mission: rocket.mission_name,
			name: rocket.rocket.rocket_name,
			id: rocket.id,
		}
		store.addRocket(data)
	}

	// check if launch is in the list of favorite rockets
	function isFavorite(id: string) {
		if (!id) return

		const rocket = store.getRockets.find((rocket: ILaunch) => rocket.id === id)
		if (rocket) return true
		return false
	}

	return { launches, sortLaunches, generateYears, handleSelected, addToFavorites, isFavorite }
}
