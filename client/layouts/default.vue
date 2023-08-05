<template>
	<v-app>
		<v-main>
			<slot />
			<Footer />
		</v-main>
	</v-app>
</template>
<script>
export default {
	name: 'DefaultLayout',
}
</script>
