<script lang="ts" setup>
useHead({
	title: 'POS System',
	meta: [{ name: 'description', content: 'Point of Sale System with Nuxt, Graphl and Vuetify.' }],
})
const drawer = ref<boolean>(true)
provide('drawer', drawer)
</script>
<template>
	<v-layout>
		<v-app-bar name="app-bar">
			<!-- logo -->
			<h1 class="font-weight-bold">Store</h1>
			<nav class="poppins">
				<NuxtLink to="/" active-class="active-link" class="font-weight-bold">
					<v-icon icon="mdi-silverware" />
					Menus
				</NuxtLink>
				<NuxtLink to="/carts" active-class="active-link" class="px-5 font-weight-bold">
					<v-icon icon="mdi-cart-variant" />
					Carts
				</NuxtLink>
				<NuxtLink to="/tables" active-class="active-link" class="font-weight-bold">
					<v-icon icon="mdi-table-furniture" />
					Tables
				</NuxtLink>
			</nav>
			<!-- account -->
			<v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer" />
		</v-app-bar>

		<SideBar />

		<v-main style="min-height: 100vh; background: var(--light-grey)">
			<v-container>
				<slot />
			</v-container>
		</v-main>
	</v-layout>
</template>
<style>
.v-app-bar {
	box-shadow: none !important;
	border-bottom: 2px solid var(--line) !important;
}
.v-toolbar__content {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 1em;
}
.v-toolbar__content nav a {
	text-decoration: none;
	color: var(--dark-grey);
}
.active-link {
	color: var(--primary) !important;
}
</style>
