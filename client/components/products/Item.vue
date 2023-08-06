<script lang="ts" setup>
import numeral from 'numeral'
import { IShip } from '@/types/'

const prop = defineProps<{
	ship: IShip
	isListView: boolean
}>()
</script>
<template>
	<v-col
		class="md:v-col-4 lg:v-col-6"
		:class="{ 'v-col-12': isListView }"
		style="min-width: 250px; max-height: 340px"
	>
		<v-hover v-slot="{ isHovering, props }">
			<v-card
				:elevaltion="isHovering ? 12 : 2"
				v-bind="props"
				:class="{ 'on-hover': isHovering }"
				variant="text"
				class="mr-2 mb-2 pa-2 h-100"
				style="
					cursor: pointer;
					background-color: #191b1a33;
					border-radius: 10px;
					border: 1px solid #51575733;
				"
			>
				<ProductsImg v-if="!isListView" :img="prop.ship.image" />
				<v-card-title>
					<div class="d-flex align-center">
						<v-chip class="text-overline mb-1 prevent-select">
							<v-icon icon="mdi-cart" color="blue-darken-3" class="mr-2" />
							{{ prop.ship.type }}
						</v-chip>
					</div>

					<h5 class="text-h5 font-weight-black prevent-select">{{ prop.ship.name }}</h5>
					<h5
						class="text-h4 mt-2 text-uppercase font-weight-bold prevent-select text-green-darken-2"
					>
						${{ numeral(prop.ship.price).format('0.0a') }}
					</h5>
				</v-card-title>
			</v-card>
		</v-hover>
	</v-col>
</template>
<style scoped>
.text-h5 {
	white-space: pre-wrap;
}

.v-card.on-hover {
	background: #51575733 !important;
}
</style>
