<script setup lang="ts">
const props = defineProps<{ showProductOptions: boolean }>()

const emit = defineEmits<{
	(e: 'update:modelValue', value: boolean): void
}>()
</script>
<template>
	<v-dialog v-model="props.showProductOptions" persistent width="1024">
		<v-card>
			<v-card-title>
				<span class="text-h5">Product Option</span>
			</v-card-title>
			<v-card-text>
				<v-container>
					<v-row>
						<v-col cols="12" sm="6" md="4">
							<v-text-field label="Legal first name*" required />
						</v-col>
						<v-col cols="12" sm="6" md="4">
							<v-text-field
								label="Legal middle name"
								hint="example of helper text only on focus"
							/>
						</v-col>
						<v-col cols="12" sm="6" md="4">
							<v-text-field
								label="Legal last name*"
								hint="example of persistent helper text"
								persistent-hint
								required
							/>
						</v-col>
						<v-col cols="12">
							<v-text-field label="Email*" required />
						</v-col>
						<v-col cols="12">
							<v-text-field label="Password*" type="password" required />
						</v-col>
						<v-col cols="12" sm="6">
							<v-select :items="['0-17', '18-29', '30-54', '54+']" label="Age*" required />
						</v-col>
						<v-col cols="12" sm="6">
							<v-autocomplete
								:items="[
									'Skiing',
									'Ice hockey',
									'Soccer',
									'Basketball',
									'Hockey',
									'Reading',
									'Writing',
									'Coding',
									'Basejump',
								]"
								label="Interests"
								multiple
							/>
						</v-col>
					</v-row>
				</v-container>
				<small>*indicates required field</small>
			</v-card-text>
			<v-card-actions>
				<v-spacer />
				<v-btn color="blue-darken-1" variant="text" @click="emit('update:modelValue', false)">
					Close
				</v-btn>
				<v-btn color="blue-darken-1" variant="text" @click="emit('update:modelValue', false)">
					Save
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>
