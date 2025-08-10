import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Theme from '../views/Theme.vue'
import ServiceDown from '../views/ServiceDown.vue'
import NotAuthorized from '../views/NotAuthorized.vue'
import User from '../views/User.vue'
import Login from '../views/Login.vue'
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
			path: '/user',
			name: 'User',
			component: User,
			beforeEnter() { ui.pageTitle="BalanceU" },
		},
		{
			path: '/login',
			name: 'Login',
			component: Login,
			beforeEnter() { ui.pageTitle="BalanceU - Login" },
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

	// Authentication guard - redirect to login if no current user
	if (!user.currentUser && to.path !== '/login') {
		return '/login'
	}

	// Fetch any data that is needed before going on (superUser, etc)
	await app.initialize() 
	
	// Proceed to the route
	return
})

export default router
