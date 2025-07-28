import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Theme from '../views/Theme.vue'
import ServiceDown from '../views/ServiceDown.vue'
import NotAuthorized from '../views/NotAuthorized.vue'
import { user, ui, api, app } from '@/stores'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),  // Use the base URL from vite.config.js for deployment (if set)
	routes: [
		{
			path: '/',
			name: 'Home',
			component: Home,
			beforeEnter() { ui.pageTitle="BalanceU " },
		},
		{
			path: '/About',
			name: 'About',
			component: About,
			beforeEnter() { ui.pageTitle="BalanceU - About" },
		},
		{
			path: '/theme',
			name: 'Theme',
			component: Theme,
			beforeEnter() { ui.pageTitle="BalanceU - Theme Selection" },
		},
		{
			path: '/ServiceDown',
			name: 'ServiceDown',
			component: ServiceDown,
		},
		{
			path: '/NotAuthorized',
			name: 'NotAuthorized',
			component: NotAuthorized,
			beforeEnter() { ui.pageTitle="BalanceU - Not Authorized" },
		},
	]
})

// EXECUTED BEFORE ROUTING
router.beforeEach(async (to, from) => {

	// Authentication To-Do	

	// Fetch any data that is needed before going on (superUser, etc)
	await app.initialize() 
	
	// Proceed to the route
	return
})

export default router
