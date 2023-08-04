<template>
	<v-app>
		<v-main>
			<slot />
			<Footer v-if="$route.fullPath !== '/pos'" />
		</v-main>
	</v-app>
</template>
<script>
export default {
	name: 'DefaultLayout',
}
</script>
