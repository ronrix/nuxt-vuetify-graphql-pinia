export const useRockets = () => {
	const query = gql`
		query getRockets {
			rockets {
				id
				name
				description
				first_flight
				stages
				height {
					feet
					meters
				}
				mass {
					kg
					lb
				}
			}
		}
	`
	const { data } = useAsyncQuery<{
		rockets: {
			id: String
			name: String
			details: String
			first_flight: Date
			stages: Number
			height: {
				feet: Number
				meters: Number
			}
			mass: {
				kg: Number
				lb: Number
			}
		}
	}>(query)

	const rockets = computed(() => data.value?.rockets)

	return { rockets }
}
