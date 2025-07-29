// theme.js store
// Use this store for theme management and color schemes

import { defineStore } from 'pinia'
import { nextTick } from 'vue'

export const useTheme = defineStore('theme', {
state: () => ({     
    currentTheme: 'ocean', // Default theme
    themes: {
        ocean: {
            name: 'Ocean Blue',
            gradient: 'linear-gradient(135deg, #2E5984 0%, #4A90E2 100%)',
            description: 'Classic blue ocean waves',
            colors: {
                primary: '#2E5984',
                secondary: '#4A90E2',
                accent: '#87CEEB',
                success: '#4CAF50',
                warning: '#FF9800',
                error: '#F44336',
                info: '#2196F3',
                // Tonal colors for better contrast
                tonalLight: '#6B8CC4',
                tonalMedium: '#4A6FA5',
                tonalDark: '#1E3A5F'
            }
        },
        sunset: {
            name: 'Sunset Orange',
            gradient: 'linear-gradient(135deg, #D2691E 0%, #FF6B35 100%)',
            description: 'Warm sunset colors',
            colors: {
                primary: '#D2691E',
                secondary: '#FF6B35',
                accent: '#FFB347',
                success: '#4CAF50',
                warning: '#FFA726',
                error: '#F44336',
                info: '#FF8C00',
                // Tonal colors for better contrast
                tonalLight: '#FF9A5A',
                tonalMedium: '#E8743A',
                tonalDark: '#A5491A'
            }
        },
        forest: {
            name: 'Forest Green',
            gradient: 'linear-gradient(135deg, #2F5233 0%, #4A7C59 100%)',
            description: 'Natural forest greens',
            colors: {
                primary: '#2F5233',
                secondary: '#4A7C59',
                accent: '#8FBC8F',
                success: '#66BB6A',
                warning: '#FF9800',
                error: '#F44336',
                info: '#4CAF50',
                // Tonal colors for better contrast
                tonalLight: '#6FA570',
                tonalMedium: '#3D6B46',
                tonalDark: '#1F3B26'
            }
        },
        lavender: {
            name: 'Lavender Purple',
            gradient: 'linear-gradient(135deg, #6A5ACD 0%, #9370DB 100%)',
            description: 'Elegant purple tones',
            colors: {
                primary: '#6A5ACD',
                secondary: '#9370DB',
                accent: '#DDA0DD',
                success: '#4CAF50',
                warning: '#FF9800',
                error: '#F44336',
                info: '#8A2BE2',
                // Tonal colors for better contrast
                tonalLight: '#B19CD9',
                tonalMedium: '#8A70D0',
                tonalDark: '#4A3C8F'
            }
        },
        rose: {
            name: 'Rose Pink',
            gradient: 'linear-gradient(135deg, #C2185B 0%, #E91E63 100%)',
            description: 'Soft rose petals',
            colors: {
                primary: '#C2185B',
                secondary: '#E91E63',
                accent: '#F8BBD9',
                success: '#4CAF50',
                warning: '#FF9800',
                error: '#F44336',
                info: '#E91E63',
                // Tonal colors for better contrast
                tonalLight: '#F06292',
                tonalMedium: '#E91E63',
                tonalDark: '#AD1457'
            }
        },
        midnight: {
            name: 'Midnight Blue',
            gradient: 'linear-gradient(135deg, #191970 0%, #2F4F4F 100%)',
            description: 'Deep midnight sky',
            colors: {
                primary: '#191970',
                secondary: '#2F4F4F',
                accent: '#4169E1',
                success: '#4CAF50',
                warning: '#FF9800',
                error: '#F44336',
                info: '#4169E1',
                // Tonal colors for better contrast
                tonalLight: '#4169E1',
                tonalMedium: '#2F4F4F',
                tonalDark: '#0F0F47'
            }
        },
        golden: {
            name: 'Golden Hour',
            gradient: 'linear-gradient(135deg, #B8860B 0%, #DAA520 100%)',
            description: 'Warm golden light',
            colors: {
                primary: '#B8860B',
                secondary: '#DAA520',
                accent: '#F0E68C',
                success: '#4CAF50',
                warning: '#FFA726',
                error: '#F44336',
                info: '#FFD700',
                // Tonal colors for better contrast
                tonalLight: '#F4D03F',
                tonalMedium: '#DAA520',
                tonalDark: '#9A7D0A'
            }
        },
        arctic: {
            name: 'Arctic Ice',
            gradient: 'linear-gradient(135deg, #4682B4 0%, #87CEEB 100%)',
            description: 'Cool arctic ice',
            colors: {
                primary: '#4682B4',
                secondary: '#5F9EA0',
                accent: '#B0E0E6',
                success: '#4CAF50',
                warning: '#FF9800',
                error: '#F44336',
                info: '#87CEEB',
                // Tonal colors for better contrast
                tonalLight: '#87CEEB',
                tonalMedium: '#5F9EA0',
                tonalDark: '#2F4F4F'
            }
        }
    }
}),

getters: {
    getCurrentTheme: (state) => state.themes[state.currentTheme],
    getAllThemes: (state) => state.themes,
    getCurrentGradient: (state) => state.themes[state.currentTheme]?.gradient || state.themes.ocean.gradient,
    getCurrentColors: (state) => state.themes[state.currentTheme]?.colors || state.themes.ocean.colors,
    getThemeColors: (state) => (themeKey) => state.themes[themeKey]?.colors || state.themes.ocean.colors
},

actions: {
    setTheme(themeKey) {
        if (this.themes[themeKey]) {
            this.currentTheme = themeKey
            this.applyTheme()
            // Save to localStorage for persistence
            localStorage.setItem('selectedTheme', themeKey)
        }
    },

    applyTheme() {
        const gradient = this.getCurrentGradient
        const colors = this.getCurrentColors
        
        // Apply the gradient to the root HTML element
        document.documentElement.style.setProperty('--current-gradient', gradient)
        // Also apply to body for fallback
        document.body.style.background = gradient
        
        // Apply colors as CSS custom properties
        Object.keys(colors).forEach(colorKey => {
            document.documentElement.style.setProperty(`--theme-${colorKey}`, colors[colorKey])
        })
        
        // Apply Vuetify theme colors (async)
        this.applyVuetifyTheme(colors)
    },

    async applyVuetifyTheme(colors) {
        // Get Vuetify instance from global
        const vuetify = window.vuetifyInstance
        if (vuetify && vuetify.theme) {
            try {
                // Update the customTheme colors directly
                const themes = vuetify.theme.themes.value
                if (themes.customTheme) {
                    Object.keys(colors).forEach(colorKey => {
                        themes.customTheme.colors[colorKey] = colors[colorKey]
                    })
                }
                
                // Also update current theme if different
                const currentTheme = vuetify.theme.current.value
                if (currentTheme && currentTheme.colors) {
                    Object.keys(colors).forEach(colorKey => {
                        currentTheme.colors[colorKey] = colors[colorKey]
                    })
                }
                
                // Wait for next tick and force update
                await nextTick()
                
                // Try multiple approaches to force reactivity
                const currentName = vuetify.theme.global.name.value
                if (currentName) {
                    // Temporarily switch to a different theme and back
                    vuetify.theme.global.name.value = 'customTheme'
                    await nextTick()
                }
                
            } catch (error) {
                console.warn('Could not update Vuetify theme colors:', error)
            }
        }
    },

    initializeTheme() {
        // Load saved theme from localStorage or use default
        const savedTheme = localStorage.getItem('selectedTheme')
        if (savedTheme && this.themes[savedTheme]) {
            this.currentTheme = savedTheme
        }
        this.applyTheme()
    },

    // Helper method to get a specific color from current theme
    getColor(colorName) {
        return this.getCurrentColors[colorName] || this.themes.ocean.colors[colorName]
    },

    // Helper method to check if a color is available in current theme
    hasColor(colorName) {
        return colorName in this.getCurrentColors
    }
}

})
