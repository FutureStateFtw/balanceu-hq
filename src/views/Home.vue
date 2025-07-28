<template>
	<!-- User Fluid to go full width -->
	<v-container fluid class="pa-8">
		<v-row>
			<v-col cols="12" class="text-center">
				<h1 class="text-h3 mb-6 text-white font-weight-light">Welcome to BalanceU Admin</h1>
				<p class="text-h6 mb-8 text-white opacity-80">
					Your administrative dashboard with customizable themes
				</p>
				
				<!-- Example using theme colors -->
				<v-row class="justify-center">
					<v-col cols="auto">
						<v-btn color="primary" size="large" class="ma-2">Primary Button</v-btn>
						<v-btn color="secondary" size="large" class="ma-2">Secondary Button</v-btn>
						<v-btn color="accent" size="large" class="ma-2">Accent Button</v-btn>
					</v-col>
				</v-row>
				
				<v-row class="justify-center mt-4">
					<v-col cols="auto">
						<v-btn color="success" size="large" class="ma-2">Success</v-btn>
						<v-btn color="warning" size="large" class="ma-2">Warning</v-btn>
						<v-btn color="error" size="large" class="ma-2">Error</v-btn>
						<v-btn color="info" size="large" class="ma-2">Info</v-btn>
					</v-col>
				</v-row>
			</v-col>
		</v-row>
	</v-container>
</template>

<script setup>
	import { api, ui } from '@/stores'
</script>

<script>

export default {
data: () => ({}),

async mounted() {

},

computed: {},
methods: {},

}
</script>

<style>
</style>

