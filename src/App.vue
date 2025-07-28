<template>
	<v-app id="app" class="gradient-background"> 

		<!--BRAND HEADER -->
		<v-app-bar height="53" class="text-white elevation-0 text-h5" color="UARed">
				<v-row class="pl-9">					
					FutureState
				</v-row>
		</v-app-bar>
		
		<!-- APPLICATION BAR -->
		<v-app-bar class="pr-lg-8 elevation-0 transparent-app-bar text-white" 
			:height="isPhone ? 70 : 100" :class="isPhone ? 'pl-5' : ''" color="transparent">
				<v-row style="width: 100%;" :class="isPhone ? 'text-h6' : 'text-h4'" class="justify-center align-center font-weight-light text-white">

					<!-- MENU HAMBURGER -- COMMENT OUT IF NO MENU FOR THIS APP -->
					<v-app-bar-nav-icon class="ml-4 text-white" size="x-large" @click.stop="drawer = !drawer">
					</v-app-bar-nav-icon>
										
		            <v-col class="text-white" :class="isPhone ? 'text-h6' : ''"
		            	align="start">{{ui.pageTitle}}</v-col>

		            <!-- DATABASE INDICATOR -->
		            <v-col v-if="user.isSuperUser && !isPhone" class="flex-grow-0 flex-shrink-1 pr-9 text-body-1 text-no-wrap font-weight-light text-white" >
		            	
		            	<div class="pt-1 text-white">{{ui.useDevDatabase ? 'Dev Database' : 'Production Database'}}</div>
		            </v-col>
	        	</v-row>
		</v-app-bar>
		
		<!-- MAIN MENU -->
		<v-navigation-drawer v-model="drawer" temporary width="375"  color="blue-grey-lighten-4">    
			<v-list nav dense>	
								
				<v-list-item to="/" title="Home" prepend-icon="mdi-home"></v-list-item>
				<v-list-item to="/About" title="About" prepend-icon="mdi-information"></v-list-item>
				<v-list-item to="/theme" title="Theme Selection" prepend-icon="mdi-palette"></v-list-item>

				<v-divider class="mt-4 mb-4"></v-divider>
				<v-spacer></v-spacer>

				<!-- LOGO -->
				<v-list-item>
					Future State Logo
				</v-list-item>
			</v-list>
		</v-navigation-drawer>

		<!-- MAIN LAYOUT INCLUDING ROUTER-VIEW.  ALL ROUTES APPEAR THERE -->
		<v-main>
			<v-divider></v-divider>	
			<v-progress-linear color="blue-grey-lighten-1" height="5" indeterminate v-if="ui.loading"></v-progress-linear>      
			<router-view />
			<SnackMessageBar />	<!-- See SnackMessageBar.vue for implementation  -->
			<ConfirmDialog />	<!-- See ConfirmDialog.vue for implementation  -->
		</v-main>		

	</v-app>
</template>

<script>
import SnackMessageBar from './components/SnackMessageBar.vue'
import ConfirmDialog from './components/common/ConfirmDialog.vue'

export default {
name: 'App',

data: () => ({
	drawer: false,
}),

computed: {
	isPhone() { return this.$vuetify.display.mobile },  // A SHORTER HELPER FUNCTION
},

methods: {	
},
	
}
</script>

<script setup>
	import { ui, user, theme } from '@/stores'
	import { onMounted } from 'vue'
	
	// Initialize theme on component mount
	onMounted(() => {
		theme.initializeTheme()
	})
</script>

<!-- SOME APPLICATION WIDE STYLES -->
<style>
::-webkit-scrollbar               { width: 16px; }
::-webkit-scrollbar-track         { background: #dde5ed; }
::-webkit-scrollbar-thumb         { background: #1E5288; }
::-webkit-scrollbar-thumb:hover   { background: #555; }

/* Gradient background for the entire application */
.gradient-background {
    background: var(--current-gradient, linear-gradient(135deg, #4A90E2 0%, #A8D8F0 100%)) !important;
    min-height: 100vh;
}

/* Make the application bar transparent so gradient shows through */
.transparent-app-bar {
    background: rgba(255, 255, 255, 0.1) !important;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

/* Ensure main content area is transparent to show gradient */
.v-main {
    background: transparent !important;
}

/* Make navigation drawer slightly transparent */
.v-navigation-drawer {
    background: rgba(236, 239, 241, 0.95) !important;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
}

.uabutton {
    border: 2px solid !important;
    border-radius: 0 !important;
    cursor: pointer !important;
    background-color: rgba(255, 255, 255, 0.9);
    transition: background-color 0.3s, color 0.3s;
}

.uabutton.red {
    border-color: #8b0015;
    color: #8b0015 !important;
    transition: background-color 0.3s, color 0.3s, border-color 0.3s; /* Add border-color to transition */
}

.uabutton.red:hover {
    background-color: #8b0015;
    color: #fff !important;
    border-color: #8b0015 !important; /* Ensure the border stays red */
}

.uabutton.blue {
    border-color: #0C234B;
    color: #0C234B !important;
    transition: background-color 0.3s, color 0.3s, border-color 0.3s; /* Add border-color to transition */
}

.uabutton.blue:hover {
    background-color: #0C234B;
    color: #fff !important;
    border-color: #0C234B !important; /* Ensure the border stays blue */
}

.arizona-line-logo {
    width: 266.41px;
    height: 19.8px;
    margin: 15.11px 20px 15.1px 10px;
}
</style>