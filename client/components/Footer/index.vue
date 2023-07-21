<template>
	<v-footer class="d-flex flex-column">
		<div class="bg-grey-lighten-2 d-flex w-100 align-center px-4">
			<strong>Get connected with us on social networks!</strong>

			<v-spacer />

			<v-btn
				v-for="link in links"
				:key="link.icon"
				class="mx-4"
				:icon="link.icon"
				variant="plain"
				size="small"
				@click="
					navigateTo(link.path, {
						external: true,
					})
				"
			/>
		</div>

		<div class="px-4 py-2 bg-black text-center w-100">
			{{ new Date().getFullYear() }} —
			<strong>Ronrix Lante</strong>
		</div>
	</v-footer>
</template>
<script>
export default {
	name: 'FooterComponnent',
}
</script>
<script setup>
const links = [
	{
		icon: 'mdi-facebook',
		path: 'https://web.facebook.com/ronrixlante1',
	},
	{
		icon: 'mdi-linkedin',
		path: 'https://www.linkedin.com/in/ronrix-lante-b379081b5/',
	},
	{
		icon: 'mdi-github',
		path: 'https://github.com/ronrix',
	},
]
</script>
