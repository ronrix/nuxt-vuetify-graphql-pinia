export const useFavoriteRockets = defineStore('favorites', {
	state: () => ({ rockets: [] }),
	getters: {
		getRockets: (state) => state.rockets,
	},
	actions: {
		addRocket(data: any) {
			// toggle add and remove rocket
			if (this.rockets.find((rocket) => rocket.id === data.id)) {
				this.removeRocket(data.id)
			} else {
				this.rockets.unshift(data)
			}
		},
		removeRocket(id: string) {
			this.rockets = this.rockets.filter((rocket: any) => rocket.id !== id)
		},
	},
})
