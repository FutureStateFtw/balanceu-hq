// user.js Store
// This is the user store which handles authentication, token management, and user-related actions.
// Token store in api.js to avoid circular references
// Be careful not to import app.js here or create other circular references.

import { defineStore } from 'pinia'
import { api, ui } from '../stores' // Adding more stores here can cause circular references.
import jscookie from 'js-cookie'

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
export const USER_SESSION_KEY = 'balanceUAdmin_user_session'

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
        { userId: 104, studentId: '123457', displayName: 'Jon', username: 'jon', password: 'FutureStatePassword' },
        { userId: 104, studentId: '123458', displayName: 'Jake', username: 'jake', password: 'FutureStatePassword' },
        { userId: 104, studentId: '123459', displayName: 'Colin', username: 'colin', password: 'FutureStatePassword' },
        { userId: 104, studentId: '123460', displayName: 'Olivia', username: 'olivia', password: 'FutureStatePassword' },
        { userId: 104, studentId: '123461', displayName: 'Daniel', username: 'daniel', password: 'FutureStatePassword' },
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
    // INITIALIZE STORE (RESTORE SESSION FROM localStorage)
    initializeAuth() {
        try {
            const savedUserId = localStorage.getItem(USER_SESSION_KEY)
            if (savedUserId) {
                // Find user by ID in our user directory
                const found = this.users.find(u => u.userId === parseInt(savedUserId))
                if (found) {
                    // Restore the user session with fresh avatar
                    const imagePath = resolveAvatar(found.username)
                    this.currentUser = { ...found, avatar: imagePath }
                    this.isUser = true
                    console.log('User session restored:', this.currentUser.displayName)
                } else {
                    // User no longer exists, clear invalid session
                    localStorage.removeItem(USER_SESSION_KEY)
                }
            }
        } catch (error) {
            console.warn('Failed to restore user session:', error)
            localStorage.removeItem(USER_SESSION_KEY)
        }
    },

    // ATTEMPT LOGIN WITH USERNAME/PASSWORD
    login(username, password) {
        const found = this.users.find(u => u.username.toLowerCase() === String(username || '').toLowerCase())
        if (found) {
            // Attach avatar path (do not persist in users array)
            const imagePath = resolveAvatar(found.username)
            this.currentUser = { ...found, avatar: imagePath }
            this.isUser = true
            
            // Persist only the user ID to localStorage
            localStorage.setItem(USER_SESSION_KEY, found.userId.toString())
            
            return true
        }
        return false
    },

    // LOGOUT USER
    logout() {
        this.currentUser = null
        this.isUser = false
        // Clear persisted session
        localStorage.removeItem(USER_SESSION_KEY)
    },
	
	
},


})
