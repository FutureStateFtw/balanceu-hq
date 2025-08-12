<template>
	<v-app id="app" class="gradient-background">

		<!-- BRAND HEADER -->
		<!-- <v-app-bar v-if="!isLoginRoute" height="53" class="text-white elevation-0 text-h5 themed-brand-header" color="primary">
			<v-row class="pl-9">FutureState</v-row>
		</v-app-bar> -->

		<!-- APPLICATION BAR -->
		<v-app-bar v-if="!isLoginRoute" class="pr-lg-8 pl-2 pl-md-6 elevation-0 text-white" :height="isPhone ? 70 : 100" color="primary">
			<v-row style="width:100%;" class="align-center font-weight-light text-white" >
				
				<!-- HAMBURGER -->
				<v-col cols="auto" class="">
					<v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
				</v-col>
				
				
				<v-col class="text-white" align="start">
					<div class="text-h4 font-weight-bold text-white mb-1">Balance<span class="accent">U</span> HQ</div>
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
							<v-avatar size="60" class="elevation-2 std-glass-avatar" @click="profileDialog=true">
								<img v-if="user.avatarUrl || user.currentUser?.avatar" 
									:src="user.avatarUrl || user.currentUser?.avatar" 
									class="high-quality-avatar-img"
									@load="onAvatarLoad" />
								<div v-else class="d-flex align-center justify-center fill-height text-subtitle-2 text-white font-weight-medium">{{ userInitials }}</div>
							</v-avatar>
						</v-col>
					</v-row>
				</v-col>
			</v-row>
		</v-app-bar>

		<!-- MAIN MENU -->
		<v-navigation-drawer v-if="!isLoginRoute" v-model="drawer" temporary width="375" class="std-glass-drawer">
			<v-list nav dense class="std-glass-list d-flex flex-column" style="height: 100%;">
				<v-list-item to="/" title="Home" prepend-icon="mdi-shield-account" class="std-glass-list-item" />
				<v-list-item to="/About" title="About" prepend-icon="mdi-information" class="std-glass-list-item" />
				<v-list-item to="/theme" title="Theme Selection" prepend-icon="mdi-palette" class="std-glass-list-item" />
				<v-divider class="mt-4 mb-4 std-glass-divider" />
				<v-spacer />
				
				<!-- LOGOUT BUTTON PINNED TO BOTTOM -->
				<v-list-item class="std-glass-button mb-4 mx-4" @click="logout">
					<template v-slot:prepend>
						<v-icon>mdi-logout</v-icon>
					</template>
					<v-list-item-title>Logout</v-list-item-title>
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
			<ProfileDialog v-model="profileDialog" />
		</v-main>

	</v-app>
</template>

<script>
import SnackMessageBar from './components/SnackMessageBar.vue'
import ConfirmDialog from './components/common/ConfirmDialog.vue'
import ProfileDialog from './components/ProfileDialog.vue'
import logoImage from '@/assets/BalanceU_White_Login.webp'
import { ui, user, theme } from '@/stores'

export default {
name: 'App',

data: () => ({
	drawer: false,
	profileDialog: false,
	logoImage
}),

computed: {
	isPhone() { return this.$vuetify.display.mobile },  // A SHORTER HELPER FUNCTION

	// Application title (uses ui.pageTitle if present)
	appTitle() { return ui.pageTitle || 'BalanceU' },

	// Whether on login route (hide chrome)
	isLoginRoute() { return this.$route.path === '/login' },

	// Display name derived from store currentUser
	userDisplayName() {
		return (user.currentUser?.displayName || 'User')
	},
	// Initials for avatar fallback
	userInitials() {
		const dn = user.currentUser?.displayName || ''
		if (!dn) return 'BU'
		return dn.split(' ').filter(Boolean).slice(0,2).map(p=>p[0]).join('').toUpperCase()
	}
},

methods: { 
	// Logout method
	logout() {
		user.currentUser = null
		this.drawer = false
		this.$router.push('/login')
	},

	// Handle avatar image loading with better quality
	onAvatarLoad(event) {
		const img = event.target
		if (img.naturalWidth > 120) { // Only process if image is larger than avatar size
			// Create canvas for high-quality resizing
			const canvas = document.createElement('canvas')
			const ctx = canvas.getContext('2d')
			
			// Set canvas size to 2x avatar size for better quality
			canvas.width = 120
			canvas.height = 120
			
			// Use better scaling
			ctx.imageSmoothingEnabled = true
			ctx.imageSmoothingQuality = 'high'
			
			// Draw resized image
			ctx.drawImage(img, 0, 0, 120, 120)
			
			// Replace image source with canvas data
			img.src = canvas.toDataURL('image/png', 0.95)
		}
	}
},

components: { SnackMessageBar, ConfirmDialog, ProfileDialog }
}
</script>

<script setup>
import { onMounted } from 'vue'
import { theme } from '@/stores'
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

/* Themed brand header */
.themed-brand-header {
    border-bottom: 2px solid var(--theme-secondary, #ffffff) !important;
	border-color: rgba(255, 255, 255, 0.1) !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2) !important;
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

/* High-quality avatar image resizing */
.high-quality-avatar-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    border-radius: 50%;
}

/* Glass avatar styling */
.std-glass-avatar {
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    cursor: pointer;
    transition: all 0.3s ease;
}

.std-glass-avatar:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
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