// user.js Store
// This is the user store which handles authentication, token management, and user-related actions.
// Token store in api.js to avoid circular references
// Be careful not to import app.js here or create other circular references.

import { defineStore } from 'pinia'
import { api, ui } from '../stores' // Adding more stores here can cause circular references.
import jscookie from 'js-cookie'
import router from '../router'
export const API_JWT_AUTH = 'balanceUAdmin_jwt_auth'

export const useUser = defineStore('userStore', {
state: () => ({
	isUser: 			false,
	isAdmin: 			false,
}),

getters: {
	appName: () => {
        return api.useBetaAPI
        ? import.meta.env.VITE_APP_NAME_BETA
        : import.meta.env.VITE_APP_NAME_PROD
    },
},

actions: {
	
	
},


})
