<template>
    <!-- PROFILE / THEME DIALOG -->
    <v-dialog v-model="model" max-width="250" persistent :scrim="false" transition="dialog-top-transition" 
              content-class="profile-dialog-positioned">
        <div class="profile-dialog-wrapper pa-5 pr-8">
            <div class="header d-flex justify-space-between align-start mb-4">
                <div>
                    <div class="text-subtitle-1 font-weight-bold text-white">Welcome {{ user?.currentUser?.displayName || 'User' }}</div>
                    <div class="text-caption text-white text-opacity-85">Student</div>
                    <div v-if="user?.currentUser?.studentId" class="text-caption mt-2 text-white text-opacity-75">STUDENT ID: {{ user.currentUser.studentId }}</div>
                    <div class="text-caption text-white text-opacity-70">The University of BalanceU</div>
                </div>
                <v-btn icon density="comfortable" variant="text" size="24" class="text-white" @click="close">
                    <v-icon icon="mdi-close" size="18" />
                </v-btn>
            </div>

            <v-divider class="mb-4 divider-line" />

            <!-- PROFILE SECTION -->
            <v-list density="compact" class="transparent-list mb-1">
                <v-list-item @click="openProfile" rounded class="px-2">
                    <template #prepend>
                        <v-icon icon="mdi-account-outline" class="mr-3" />
                    </template>
                    <v-list-item-title class="text-body-2">Profile</v-list-item-title>
                </v-list-item>
            </v-list>

            <!-- THEME SECTION (COLLAPSIBLE) -->
            <v-list density="compact" class="transparent-list">
                <v-list-item rounded class="px-2 theme-toggle" @click.stop="toggleThemes" role="button">
                    <template #prepend>
                        <v-icon icon="mdi-palette-outline" size="18" class="mr-2" />
                    </template>
                    <v-list-item-title class="text-body-2 font-weight-medium">Theme</v-list-item-title>
                    <template #append>
                        <v-icon :icon="showThemes ? 'mdi-chevron-up' : 'mdi-chevron-down'" size="18" />
                    </template>
                </v-list-item>
            </v-list>
            <transition name="theme-collapse">
                <v-list v-if="showThemes" density="compact" class="transparent-list mt-1">
                    <v-list-item v-for="entry in themeEntries" :key="entry.key" rounded class="px-2"
                                 @click.stop="selectTheme(entry.key)" role="button">
                        <template #prepend>
                            <div class="theme-dot mr-3" :class="{'selected': entry.key===theme.currentTheme}" :style="{background: entry.theme.colors.accent}"></div>
                        </template>
                        <v-list-item-title class="text-body-2" :class="{'font-weight-medium': entry.key===theme.currentTheme}">{{ entry.theme.name }}</v-list-item-title>
                        <template #append>
                            <v-icon v-if="entry.key===theme.currentTheme" icon="mdi-check" size="16" />
                        </template>
                    </v-list-item>
                </v-list>
            </transition>

            <v-divider class="my-4 divider-line" />
            <div class="d-flex justify-end">
                <v-btn variant="text" color="red" class="text-none" @click="doLogout">Log Out</v-btn>
            </div>
            <div class="glass-border-glow" />
        </div>
    </v-dialog>
</template>

<script>
import { ui, user, theme } from '@/stores'
export default {
    name: 'ProfileDialog',
    props: { modelValue: { type: Boolean, default: false } },
    emits: ['update:modelValue'],

    data: () => ({ ui, user, theme, showThemes: false }),

    computed: {
        model: {
            get() { return this.modelValue },
            set(v) { this.$emit('update:modelValue', v) }
        },
        // Stable list of themes for iteration
        themeEntries() {
            const all = theme.getAllThemes
            return Object.keys(all).map(k => ({ key: k, theme: all[k] }))
        },
        themeList() { return theme.getAllThemes }
    },

    methods: {
        close() { this.model = false },
        openProfile() { /* placeholder for future profile editing */ },
        selectTheme(key) {
            if (key === theme.currentTheme) return
            theme.setTheme(key)
        },
    toggleThemes() { this.showThemes = !this.showThemes },
        doLogout() {
            user.logout()
            this.close()
            this.$router.push('/login')
        }
    }
}
</script>

<style scoped>
/* Position dialog in top right */
:global(.profile-dialog-positioned) {
    position: fixed !important;
    top: 140px !important;
    right: 15px !important;
    left: auto !important;
    transform: none !important;
    margin: 0 !important;
}

.profile-dialog-wrapper {
    position: relative;
    background: linear-gradient(135deg, 
        rgba(255, 255, 255, 0.15) 0%, 
        rgba(255, 255, 255, 0.05) 100%);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 24px;
    box-shadow: 
        0 8px 32px rgba(0, 0, 0, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.2),
        0 0 0 1px rgba(255, 255, 255, 0.05);
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.profile-dialog-wrapper > *:not(.glass-border-glow) { position: relative; z-index: 2; }
.glass-border-glow { 
    position: absolute; 
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border-radius: 26px;
    background: linear-gradient(45deg, 
        var(--theme-primary, #2E5984), 
        var(--theme-secondary, #4A90E2), 
        var(--theme-accent, #87CEEB),
        var(--theme-primary, #2E5984));
    background-size: 300% 300%;
    opacity: 0.3;
    z-index: 0;
    pointer-events: none;
    animation: borderGlow 3s ease-in-out infinite alternate;
}

@keyframes borderGlow {
    0% { background-position: 0% 50%; }
    100% { background-position: 100% 50%; }
}
.transparent-list { 
    background: transparent !important; 
    overflow: hidden !important;
    /* Hide scrollbars on lists */
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE 10+ */
}
.transparent-list::-webkit-scrollbar {
    display: none; /* WebKit */
}
.theme-dot { width:14px; height:14px; border-radius:50%; box-shadow:0 0 0 2px rgba(255,255,255,0.3); transition: all .3s; }
.theme-dot.selected { box-shadow:0 0 0 2px rgba(255,255,255,0.85), 0 0 6px 2px rgba(255,255,255,0.45); }
.divider-line { border-color: rgba(255,255,255,0.3) !important; }
.profile-dialog-wrapper .v-list-item { transition: background .25s, transform .25s; }
.profile-dialog-wrapper .v-list-item:hover { background: rgba(255,255,255,0.16) !important; transform: translateX(4px); }
.theme-toggle:hover { transform: none !important; }
/* Collapse transition */
.theme-collapse-enter-active, .theme-collapse-leave-active { transition: max-height .28s ease, opacity .25s ease; }
.theme-collapse-enter-from, .theme-collapse-leave-to { max-height: 0; opacity:0; }
.theme-collapse-enter-to, .theme-collapse-leave-from { max-height: 400px; opacity:1; }
</style>
