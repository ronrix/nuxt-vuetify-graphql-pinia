<script setup lang="ts">
const category = ref<string>('spaceship 1')
const pageType = ref<string>('menus')
const { ships, addToCart, isListView } = useShips()
</script>
<template>
	<!-- sidebar -->
	<UiMainWrapper>
		<v-layout>
			<div class="glass" />
			<UiPosSideBar />

			<v-app-bar flat>
				<!-- product categories -->
				<v-col
					class="d-flex ml-5 px-3 text-grey-lighten-5 overflow-x-auto no-scrollbar"
					style="border: 1px solid #51575733"
				>
					<v-btn :active="category === 'spaceship 1'" @click="category = 'spaceship 1'">
						Spaceship 1
					</v-btn>
					<v-btn :active="category === 'spaceship 2'" @click="category = 'spaceship 2'">
						Spaceship 2
					</v-btn>
					<v-btn :active="category === 'spaceship 3'" @click="category = 'spaceship 3'">
						Spaceship 3
					</v-btn>
				</v-col>
				<v-col class="text-right mr-5 text-grey-lighten-5">
					<v-btn variant="tonal" :active="pageType === 'menus'" @click="pageType = 'menus'">
						Menus
					</v-btn>
					<v-btn variant="tonal" :active="pageType === 'carts'" @click="pageType = 'carts'">
						Carts
					</v-btn>
					<v-btn variant="tonal" :active="pageType === 'tables'" @click="pageType = 'tables'">
						Tables
					</v-btn>
				</v-col>
			</v-app-bar>

			<v-main class="overflow-auto" style="min-height: 300px">
				<!-- product items -->
				<v-container fluid>
					<v-checkbox v-model="isListView" label="List view" />
					<v-row no-gutters>
						<UiProductCard
							v-for="ship in ships"
							:key="ship.id"
							:ship="ship"
							:is-list-view="isListView"
							@click="addToCart(ship)"
						/>
					</v-row>
				</v-container>
			</v-main>
		</v-layout>
	</UiMainWrapper>
</template>
<style scoped>
.v-navigation-drawer,
.v-main {
	position: relative;
	border: none;
	background: transparent !important;
}

.v-layout {
	/* background-image: url('/backdrop-image.avif');
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center; */
	background-color: rgb(37 38 43);
}

.v-layout div.glass::after {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	border: none;
	backdrop-filter: blur(25px) saturate(200%);
	backdrop-filter: blur(16px) saturate(200%);
	background-color: rgb(52 58 8 / 20%);
	z-index: -1;
}

.v-toolbar {
	background: transparent !important;
}
</style>
