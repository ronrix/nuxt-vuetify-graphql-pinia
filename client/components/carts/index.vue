<script setup lang="ts">
import { Transact } from '@/types/'

const props = defineProps<{ data: Transact[] }>()
</script>
<template>
	<v-window-item v-for="n in 3" :key="n" :value="n">
		<v-list lines="two">
			<UiErrorMsg v-if="!props.data?.length">
				<h5>No data is found!</h5>
			</UiErrorMsg>
			<v-sheet v-for="(item, id) in props.data" v-else :key="id">
				<CartsItem :item="item" />
			</v-sheet>
		</v-list>
	</v-window-item>
</template>
