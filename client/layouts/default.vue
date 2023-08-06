<template>
	<v-app>
		<v-main>
			<div class="container h-screen d-flex w-screen">
				<slot />
			</div>
		</v-main>
	</v-app>
</template>
<script>
export default {
	name: 'DefaultLayout',
}
</script>
<style scoped>
div.container {
	/* background-color: #191a1c; */
	color: #f2f2f2;
	height: 100vh;
}
</style>
