<template>
	<v-app id="app" class="gradient-background">

		<!-- BRAND HEADER -->
		<v-app-bar v-if="!isLoginRoute" height="53" class="text-white elevation-0 text-h5 themed-brand-header" color="primary">
			<v-row class="pl-9">FutureState</v-row>
		</v-app-bar>

		<!-- APPLICATION BAR -->
		<v-app-bar v-if="!isLoginRoute" class="pr-lg-8 elevation-0 transparent-app-bar text-white" :height="isPhone ? 70 : 100" :class="isPhone ? 'pl-5' : ''" color="transparent">
			<v-row style="width:100%;" class="justify-center align-center font-weight-light text-white" >
				<v-col cols="auto">
					<v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
				</v-col>
				<v-col class="text-white" align="start">
					<div class="text-h4 font-weight-bold text-white mb-1">Balance<span class="accent">U</span></div>
				</v-col>
				<v-spacer></v-spacer>
				<!-- USER PROFILE -->
				<v-col cols="auto">
					<v-row align="center" no-gutters>
						<v-col class="d-none d-sm-flex flex-column text-right mr-3">
							<span class="welcome-label">Welcome</span>
							<span class="user-name">{{ userDisplayName }}</span>
						</v-col>
						<v-col cols="auto" class="mr-4">
							<v-avatar size="40" class="elevation-2 user-profile-card">
								<v-img v-if="user.currentUser?.imageUrl" :src="user.currentUser.imageUrl" cover></v-img>
								<div v-else class="d-flex align-center justify-center fill-height text-subtitle-2 text-white font-weight-medium">{{ userInitials }}</div>
							</v-avatar>
						</v-col>
					</v-row>
				</v-col>
			</v-row>
		</v-app-bar>

		<!-- MAIN MENU -->
		<v-navigation-drawer v-if="!isLoginRoute" v-model="drawer" temporary width="375" color="primary" class="themed-drawer">
			<v-list nav dense class="themed-list">
				<v-list-item to="/" title="Home" prepend-icon="mdi-home" class="themed-list-item" />
				<v-list-item to="/user" title="User" prepend-icon="mdi-account" class="themed-list-item" />
				<v-list-item to="/About" title="About" prepend-icon="mdi-information" class="themed-list-item" />
				<v-list-item to="/theme" title="Theme Selection" prepend-icon="mdi-palette" class="themed-list-item" />
				<v-divider class="mt-4 mb-4 themed-divider" />
				<v-spacer />
				<!-- LOGO -->
				<v-list-item class="themed-logo">
					<div class="text-white font-weight-medium">Future State Logo</div>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>

		<!-- MAIN LAYOUT INCLUDING ROUTER-VIEW.  ALL ROUTES APPEAR THERE -->
		<v-main>
			<v-divider v-if="!isLoginRoute" />
			<v-progress-linear v-if="!isLoginRoute && ui.loading" color="blue-grey-lighten-1" height="5" indeterminate />
			<router-view />
			<SnackMessageBar />
			<ConfirmDialog />
		</v-main>

	</v-app>
</template>

<script>
import SnackMessageBar from './components/SnackMessageBar.vue'
import ConfirmDialog from './components/common/ConfirmDialog.vue'
import { ui, user, theme } from '@/stores'

export default {
name: 'App',

data: () => ({
	drawer: false,
}),

computed: {
	isPhone() { return this.$vuetify.display.mobile },  // A SHORTER HELPER FUNCTION

	// Application title (uses ui.pageTitle if present)
	appTitle() { return ui.pageTitle || 'BalanceU' },

	// Whether on login route (hide chrome)
	isLoginRoute() { return this.$route.path === '/login' },

	// Display name derived from store currentUser
	userDisplayName() {
		return user.currentUser?.displayName || 'User'
	},

	// Initials derived from displayName
	userInitials() {
		const dn = user.currentUser?.displayName || ''
		if (!dn) return 'BU'
		return dn.split(' ').filter(Boolean).slice(0,2).map(p=>p[0]).join('').toUpperCase()
	},

	// Display name for welcome text
	userDisplayName() {
		if (user.currentUser?.displayName) return user.currentUser.displayName
		const names = user.currentUser?.displayName?.split(' ') || []
		return names[0] || 'User'
	},

	// Initials for avatar fallback
	userInitials() {
		if (!user.currentUser?.displayName) return 'BU'
		return user.currentUser.displayName
			.split(' ')
			.filter(Boolean)
			.slice(0,2)
			.map(n => n[0])
			.join('')
			.toUpperCase()
	}
},

methods: { },

components: { SnackMessageBar, ConfirmDialog }
}
</script>

<script setup>
import { onMounted } from 'vue'
import { theme } from '@/stores'
onMounted(() => { theme.initializeTheme() })
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

/* Themed brand header */
.themed-brand-header {
    background: var(--theme-primary, #2E5984) !important;
    border-bottom: 2px solid var(--theme-secondary, #4A90E2) !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2) !important;
}

/* Make the application bar transparent so gradient shows through */
.transparent-app-bar {
    background: rgba(255, 255, 255, 0.1) !important;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

/* User profile card in app bar */
.user-profile-card {
    border-radius: 12px !important;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    transition: all 0.3s ease;
}

.user-profile-card:hover {
    background: rgba(255, 255, 255, 0.15) !important;
}

/* App title styling (fatten font) */
.app-title {
	font-weight: 700;
	font-size: 1.65rem;
	color: white;
	letter-spacing: .5px;
	text-shadow: 0 2px 4px rgba(0,0,0,0.35);
}

.welcome-label {
	font-size: .65rem;
	line-height: 1.1;
	color: rgba(255,255,255,.85);
	text-transform: uppercase;
	letter-spacing: .8px;
}

.user-name {
	font-size: .8rem;
	font-weight: 600;
	color: white;
	letter-spacing: .5px;
}

/* Ensure main content area is transparent to show gradient */
.v-main {
    background: transparent !important;
}

/* Make navigation drawer use theme colors */
.v-navigation-drawer.themed-drawer {
    background: var(--theme-primary, #2E5984) !important;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.themed-list {
    background: transparent !important;
}

.themed-list-item {
    color: white !important;
    border-radius: 8px !important;
    margin: 4px 8px !important;
    transition: all 0.3s ease !important;
}

.themed-list-item:hover {
    background: var(--theme-secondary, #4A90E2) !important;
    transform: translateX(4px);
}

.themed-list-item.v-list-item--active {
    background: var(--theme-accent, #87CEEB) !important;
    color: var(--theme-primary, #2E5984) !important;
    font-weight: bold;
}

.themed-list-item .v-icon {
    color: white !important;
}

.themed-list-item.v-list-item--active .v-icon {
    color: var(--theme-primary, #2E5984) !important;
}

.themed-divider {
    border-color: rgba(255, 255, 255, 0.3) !important;
}

.themed-logo {
    color: white !important;
    text-align: center !important;
    padding: 16px !important;
    background: var(--theme-secondary, #4A90E2) !important;
    margin: 8px !important;
    border-radius: 8px !important;
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

.accent { color: #FFC107; }
</style>