<script lang="ts" setup>
import numeral from 'numeral'

const prop = defineProps({
	ship: { type: Object, required: true },
	isListView: { type: Boolean, required: true },
})
</script>
<template>
	<v-col class="md:v-col-4 lg:v-col-6 h-100" :class="{ 'v-col-12': isListView }" style="min-width: 250px">
		<v-hover v-slot="{ isHovering, props }">
			<v-card
				:elevaltion="isHovering ? 12 : 2"
				v-bind="props"
				:class="{ 'on-hover': isHovering }"
				variant="text"
				class="mr-2 mb-2 pa-2"
				style="
					cursor: pointer;
					background-color: #191b1a33;
					border-radius: 10px;
					border: 1px solid #51575733;
				"
			>
				<v-img
					v-if="!isListView"
					:src="prop.ship.image"
					lazy-src="https://images.unsplash.com/photo-1601892782633-675465fa7f3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=876&q=80"
					height="150px"
					cover
					style="border-radius: 10px"
					rounded
				/>
				<v-card-title>
					<!-- product code -->
					<div class="d-flex align-center">
						<v-icon icon="mdi-cart" color="blue-darken-3" size="sm" />
						<v-chip class="text-overline mb-1">{{ prop.ship.type }}</v-chip>
					</div>

					<h5 class="text-h5 font-weight-black">{{ prop.ship.name }}</h5>
					<h5 class="text-h4 mt-2 text-grey-lighten-2 text-uppercase">
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
