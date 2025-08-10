// user.js Store
// This is the user store which handles authentication, token management, and user-related actions.
// Token store in api.js to avoid circular references
// Be careful not to import app.js here or create other circular references.

import { defineStore } from 'pinia'
import { api, ui } from '../stores' // Adding more stores here can cause circular references.
import jscookie from 'js-cookie'
import router from '../router'

// PRE-LOAD USER AVATAR IMAGES (expects files named <username>.png in assets folder)
// Using Vite's import.meta.glob to eagerly import all .png files for quick lookup.
const avatarImages = import.meta.glob('../assets/*.png', { eager: true, import: 'default' })
function resolveAvatar(username) {
    if (!username) return null
    // Primary key form produced by the relative glob above
    const directKey = `../assets/${username}.png`
    if (avatarImages[directKey]) return avatarImages[directKey]
    // Fallback: search by filename end (robust if path forms change)
    const match = Object.entries(avatarImages).find(([k]) => k.endsWith(`/${username}.png`))
    return match ? match[1] : null
}
export const API_JWT_AUTH = 'balanceUAdmin_jwt_auth'

export const useUser = defineStore('userStore', {
state: () => ({
	isUser: 			false,
	isAdmin: 			false,
    // CURRENT AUTHENTICATED USER (null until login)
    currentUser: 		null,

    // MOCK USER DIRECTORY (REMOVE WHEN REAL AUTH WIRED)
    users: [
        { userId: 101, studentId: '123450', displayName: 'Joe',     username: 'joe',     password: 'FutureStatePassword' },
        { userId: 102, studentId: '123451', displayName: 'Chris',   username: 'chris',   password: 'FutureStatePassword' },
        { userId: 103, studentId: '123452', displayName: 'Erika',   username: 'erika',   password: 'FutureStatePassword' },
        { userId: 104, studentId: '123456', displayName: 'Drennen', username: 'drennen', password: 'FutureStatePassword' },
    ],
}),

getters: {
	appName: () => {
        return api.useBetaAPI
        ? import.meta.env.VITE_APP_NAME_BETA
        : import.meta.env.VITE_APP_NAME_PROD
    },

    // Computed avatar URL derived from assets/<username>.png (null if not found)
    avatarUrl: (state) => {
        return state.currentUser ? resolveAvatar(state.currentUser.username) : null
    },
},

actions: {
    // ATTEMPT LOGIN WITH USERNAME/PASSWORD
    login(username, password) {
        const found = this.users.find(u => u.username.toLowerCase() === String(username || '').toLowerCase())
        if (found) {
            // Attach avatar path (do not persist in users array)
            const imagePath = resolveAvatar(found.username)
            this.currentUser = { ...found, avatar: imagePath }
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
