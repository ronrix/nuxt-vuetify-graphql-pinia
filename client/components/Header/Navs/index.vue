<template>
	<header>
		<HeaderTitle :title="props.title" />
		<h5>Nuxt 3 / Vuetify / Graphql / Pinia</h5>

		<nav>
			<NuxtLink
				v-for="link in links"
				:key="link"
				class="card-flex-list"
				:to="link.path"
				exact-active-class="active"
			>
				<v-icon :icon="link.icon" size="sm" />
				{{ link.title }}
			</NuxtLink>
		</nav>
	</header>
</template>
<script>
export default {
	name: 'NavsComponent',
	inheritAttrs: false,
}
</script>
<script setup>
const props = defineProps({ title: { type: String, required: true } })
const links = [
	{
		title: 'Home',
		path: '/',
		icon: 'mdi-home',
	},
	{
		title: 'Launch',
		path: '/launch',
		icon: 'mdi-rocket-launch',
	},
	{
		title: 'Rockets',
		path: '/rocket',
		icon: 'mdi-rocket-launch',
	},
	{
		title: 'Favorites',
		path: '/favorites',
		icon: 'mdi-heart',
	},
]
</script>
<style lang="scss" scoped>
nav {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	padding: 1em;

	a.card-flex-list {
		padding: 0.5em;
		border: 1px solid #222;
		flex-grow: 1;
		width: 100%;
		text-align: center;
		text-decoration: none;
		color: #121212;

		&:hover {
			background-color: #f2f2f2;
		}
	}

	a.active {
		background-color: #f2f2f2;
	}
}
</style>
