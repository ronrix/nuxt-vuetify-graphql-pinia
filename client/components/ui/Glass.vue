<script setup lang="ts"></script>
<template>
	<div class="glass">
		<slot />
	</div>
</template>

<style scoped>
div.glass::after {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	border: none;
	border-radius: 20px;
	background: #51575733;
	z-index: -1;
	backdrop-filter: blur(25px) saturate(200%);
	backdrop-filter: blur(25px) saturate(200%);
	backdrop-filter: blur(25px) saturate(200%);
	backdrop-filter: blur(25px) saturate(200%);
}
</style>
