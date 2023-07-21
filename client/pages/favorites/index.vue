<template>
	<v-container>
		<HeaderNavs title="SpaceX Favorites" />

		<h3>List of favorite launched rockets and missions</h3>
		<p v-if="!store.getRockets?.length">No results</p>

		<!-- <v-list :items="store.getRockets" /> -->
		<v-list>
			<div v-for="rocket in store.getRockets" :key="rocket.id">
				<div class="list-left">
					<span>
						<strong>Mission:</strong>
						{{ rocket.mission }}
					</span>
					|
					<span>
						<strong>Rocket:</strong>
						{{ rocket.name }}
					</span>
				</div>
				<div class="remove-btn" @click="store.removeRocket(rocket.id)">
					<v-icon icon="mdi-close" />
				</div>
			</div>
		</v-list>
	</v-container>
</template>
<script lang="ts" setup>
const store = useFavoriteRockets()
</script>
<style lang="scss" scoped>
div.v-container {
	min-height: 100vh;

	h3 {
		margin-top: 1em;
	}

	.v-list {
		div {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0.3em 0.2em;

			.list-left {
				display: flex;
				align-items: center;
				gap: 5px;
			}

			&:hover {
				background-color: #f2f2f2;
			}

			.remove-btn {
				cursor: pointer;

				&:hover {
					color: red;
				}
			}
		}
	}
}
</style>
