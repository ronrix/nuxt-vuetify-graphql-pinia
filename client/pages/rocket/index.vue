<template>
	<v-container>
		<HeaderNavs title="SpaceX Rockets" />

		<p v-if="loading">Loading...</p>
		<p v-if="!rockets?.length && !loading">No results</p>

		<section v-for="rocket in rockets" :key="rocket.id">
			<h3>Rocket: {{ rocket.name }}</h3>
			<p>
				{{ new Date(rocket?.first_flight).toLocaleDateString() }}
			</p>
			<h4>stages: {{ rocket.stages }}</h4>
			<h4>Mass: {{ rocket.mass.lb }}lb | {{ rocket.mass.kg }}kg</h4>
			<h4>Height: {{ rocket.height.feet }}ft | {{ rocket.height.meters }}m</h4>
			<p>{{ rocket.description }}</p>
		</section>
	</v-container>
</template>
<script lang="ts" setup>
const loading = useState('loading', () => true)
const { rockets } = useRockets()

watchEffect(() => {
	// toggle loading
	if (rockets.value?.length) loading.value = false
	if (!rockets.value?.length) loading.value = true
})
</script>
<style lang="scss" scoped>
div.v-container {
	min-height: 100vh;

	section {
		margin: 1em 0;

		p {
			font-size: 0.8em;
			color: #888;
		}

		h4 {
			font-size: 0.9em;
		}
	}
}
</style>
