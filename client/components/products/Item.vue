<script lang="ts" setup>
import numeral from 'numeral'
import { Order } from '@/types/'

const prop = defineProps<{
	ship: Order
	isListView: boolean
}>()
</script>
<template>
	<v-col :class="{ 'v-col-12': isListView, 'ma-1': true }">
		<v-hover v-slot="{ isHovering, props }">
			<v-card
				v-bind="props"
				:class="{
					'mr-2 mb-2 h-100 d-flex rounded rounded-xl border': true,
					'elevation-2': isHovering,
				}"
				variant="text"
				style="cursor: pointer; background-color: #ffff"
			>
				<v-col :cols="!isListView ? 4 : 'auto'">
					<ProductsImg v-if="!isListView" :img="prop.ship.image" style="width: 120px" />
					<h5
						class="text-h4 mt-2 text-uppercase prevent-select d-flex align-start font-weight-medium"
					>
						<span class="text-h6 font-weight-black" style="color: var(--primary)">$</span>
						<span>{{ numeral(prop.ship.price).format('0.0a') }}</span>
					</h5>
				</v-col>
				<v-col>
					<v-card-title class="flex-grow-2 prevent-select">
						<h5 class="font-weight-black" style="white-space: pre-wrap">
							{{ prop.ship.name }}
						</h5>
						<div class="d-flex align-center">
							<v-chip class="text-caption mb-1" variant="outlined" color="info">
								{{ prop.ship.type }}
							</v-chip>
						</div>
						<p class="text-caption font-weight-medium" :style="{ whiteSpace: 'pre-wrap' }">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, labore?
						</p>
					</v-card-title>
				</v-col>
			</v-card>
		</v-hover>
	</v-col>
</template>
