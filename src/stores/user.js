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
    // CURRENT AUTHENTICATED USER (null until login)
    currentUser: 		null,

    // MOCK USER DIRECTORY (REMOVE WHEN REAL AUTH WIRED)
    users: [
        { userId: 101, displayName: 'Joe',    imageUrl: null, username: 'joe',     password: 'password' },
        { userId: 102, displayName: 'Chris', imageUrl: null, username: 'chris',   password: 'password' },
        { userId: 103, displayName: 'Erika',  imageUrl: null, username: 'erika',   password: 'password' },
        { userId: 104, displayName: 'Drennen', imageUrl: null, username: 'drennen', password: 'password' },
    ],
}),

getters: {
	appName: () => {
        return api.useBetaAPI
        ? import.meta.env.VITE_APP_NAME_BETA
        : import.meta.env.VITE_APP_NAME_PROD
    },
},

actions: {
    // ATTEMPT LOGIN WITH USERNAME/PASSWORD
    login(username, password) {
        const found = this.users.find(u => u.username.toLowerCase() === String(username || '').toLowerCase() && u.password === password)
        if (found) {
            this.currentUser = { ...found } // shallow clone for safety
            this.isUser = true
            return true
        }
        return false
    },

    // LOGOUT USER
    logout() {
        this.currentUser = null
        this.isUser = false
    },
	
	
},


})
