<template>
	<v-container>
		<HeaderNavs title="SpaceX Launches" />

		<!-- filtering -->
		<section>
			<v-select
				color="blue"
				label="Filter by year"
				:items="years"
				@update:model-value="handleSelected"
			/>
		</section>

		<!-- sorting btns -->
		<v-chip-group selected-class="text-primary" column color="blue">
			<v-chip v-for="tag in tags" :key="tag" @click="sortLaunches(tag)">
				{{ tag }}
			</v-chip>
		</v-chip-group>

		<p v-if="loading">Loading...</p>
		<p v-if="!launches?.length && !loading">No results</p>

		<v-row v-for="launch in launches" :key="launch.id" class="launch">
			<v-col cols="1">
				<v-btn
					:icon="isFavorite(launch.id) ? 'mdi-heart' : 'mdi-heart-outline'"
					density="compact"
					@click="addToFavorites(launch.id)"
				/>
			</v-col>
			<v-col>
				{{ launch.id }}
				<h3>Mission: {{ launch?.mission_name }}</h3>
				<p class="date">
					{{ launch?.launch_site?.site_name ?? 'NULL' }} -
					{{ new Date(launch?.launch_date_utc).toLocaleDateString() }}
				</p>
				<h4>Rocket Name: {{ launch?.rocket?.rocket_name }}</h4>
				<p>{{ launch?.details }}</p>
			</v-col>
		</v-row>
	</v-container>
</template>
<script lang="ts" setup>
const tags = ['ASC', 'DESC']
const loading = useState('loading', () => true)

const { launches, sortLaunches, generateYears, handleSelected, addToFavorites, isFavorite } = useLaunches()
const years = generateYears()

watchEffect(() => {
	// toggle loading
	if (launches.value?.length) loading.value = false
	if (!launches.value?.length) loading.value = true
})
</script>

<style scoped lang="scss">
div.v-container {
	color: #121212;
	min-height: 100vh;

	h2 {
		display: flex;
		align-items: center;
		gap: 10px;
		font-size: 2em;
	}

	.launch {
		margin: 1em 0;

		p {
			text-align: justify;
		}

		p.date {
			font-size: 0.8em;
			color: #888;
		}

		h3 {
			font-size: 1.2em;
			color: #333;
		}

		h4 {
			font-size: 1em;
			color: #444;
		}
	}
}
</style>
