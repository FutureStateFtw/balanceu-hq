<template>
    <v-container fluid class="pa-6">
        <!-- Header with Close Button -->
        <v-row class="">
            <v-col cols="12" class="d-flex justify-space-between align-center">
                <div class="text-h5 font-weight-light text-white">Choose a Theme</div>
                <v-btn
                    icon="mdi-close"
                    variant="text"
                    size="large"
                    color="white"
                    @click="closeThemeSelection"
                    class="close-btn"
                ></v-btn>
            </v-col>
        </v-row>

        <!-- Theme Grid -->
        <v-row>
            <v-col 
                v-for="(themeData, themeKey) in theme.getAllThemes" 
                :key="themeKey"
                cols="6" 
                sm="4" 
                md="3" 
                lg="3"
            >
                <div 
                    :class="['theme-box', { 'selected': theme.currentTheme === themeKey }]"
                    @click="selectTheme(themeKey)"
                    :style="{ background: themeData.gradient }"
                >
                    <v-icon 
                        v-if="theme.currentTheme === themeKey"
                        icon="mdi-check-circle"
                        color="white"
                        size="large"
                        class="selected-icon"
                    ></v-icon>
                </div>
            </v-col>
        </v-row>

        <!-- Theme Palette Demonstration -->
        <v-row class="mt-12" :key="theme.currentTheme">
            <v-col cols="12">
                <h3 class="text-h5 mb-6 text-white font-weight-light text-center">Theme Palette Preview</h3>
                
                <!-- Buttons Row -->
                <v-row class="justify-center mb-6">
                    <v-col cols="12" class="text-center">
                        <v-btn color="primary" size="large" class="ma-2 px-6">Primary</v-btn>
                        <v-btn color="secondary" size="large" class="ma-2 px-6">Secondary</v-btn>
                        <v-btn color="accent" size="large" class="ma-2 px-6">Accent</v-btn>
                        <v-btn color="success" size="large" class="ma-2 px-6">Success</v-btn>
                        <v-btn color="warning" size="large" class="ma-2 px-6">Warning</v-btn>
                        <v-btn color="error" size="large" class="ma-2 px-6">Error</v-btn>
                        <v-btn color="info" size="large" class="ma-2 px-6">Info</v-btn>
                    </v-col>
                </v-row>

                <!-- Cards Row -->
                <v-row class="justify-center mb-6">
                    <v-col cols="12" sm="6" md="4" lg="3">
                        <v-card color="primary" class="theme-demo-card">
                            <v-card-title class="text-white">Primary Card</v-card-title>
                            <v-card-text class="text-white">
                                This card uses the primary color from the current theme palette.
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col cols="12" sm="6" md="4" lg="3">
                        <v-card color="secondary" class="theme-demo-card">
                            <v-card-title class="text-white">Secondary Card</v-card-title>
                            <v-card-text class="text-white">
                                This card uses the secondary color from the current theme palette.
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col cols="12" sm="6" md="4" lg="3">
                        <v-card color="accent" class="theme-demo-card">
                            <v-card-title class="text-white">Accent Card</v-card-title>
                            <v-card-text class="text-white">
                                This card uses the accent color from the current theme palette.
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>

                <!-- Chips Row -->
                <v-row class="justify-center mb-6">
                    <v-col cols="12" class="text-center">
                        <v-chip color="primary" size="large" class="ma-2" label>Primary Chip</v-chip>
                        <v-chip color="secondary" size="large" class="ma-2" label>Secondary Chip</v-chip>
                        <v-chip color="success" size="large" class="ma-2" label>Success Chip</v-chip>
                        <v-chip color="warning" size="large" class="ma-2" label>Warning Chip</v-chip>
                        <v-chip color="error" size="large" class="ma-2" label>Error Chip</v-chip>
                        <v-chip color="info" size="large" class="ma-2" label>Info Chip</v-chip>
                    </v-col>
                </v-row>

                <!-- Progress and Alerts Row -->
                <v-row class="justify-center mb-6">
                    <v-col cols="12" md="6">
                        <div class="mb-4">
                            <p class="text-white mb-2">Primary Progress</p>
                            <v-progress-linear color="primary" model-value="75" height="10" rounded></v-progress-linear>
                        </div>
                        <div class="mb-4">
                            <p class="text-white mb-2">Secondary Progress</p>
                            <v-progress-linear color="secondary" model-value="60" height="10" rounded></v-progress-linear>
                        </div>
                        <div class="mb-4">
                            <p class="text-white mb-2">Success Progress</p>
                            <v-progress-linear color="success" model-value="90" height="10" rounded></v-progress-linear>
                        </div>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-alert color="success" class="mb-3" icon="mdi-check-circle">
                            Success alert with theme colors
                        </v-alert>
                        <v-alert color="warning" class="mb-3" icon="mdi-alert">
                            Warning alert with theme colors
                        </v-alert>
                        <v-alert color="error" class="mb-3" icon="mdi-alert-circle">
                            Error alert with theme colors
                        </v-alert>
                    </v-col>
                </v-row>

                <!-- Badges and Icons Row -->
                <v-row class="justify-center">
                    <v-col cols="12" class="text-center">
                        <v-badge color="primary" content="99+" class="ma-4">
                            <v-icon color="white" size="x-large">mdi-email</v-icon>
                        </v-badge>
                        <v-badge color="secondary" content="5" class="ma-4">
                            <v-icon color="white" size="x-large">mdi-bell</v-icon>
                        </v-badge>
                        <v-badge color="success" content="✓" class="ma-4">
                            <v-icon color="white" size="x-large">mdi-check-circle</v-icon>
                        </v-badge>
                        <v-badge color="warning" content="!" class="ma-4">
                            <v-icon color="white" size="x-large">mdi-alert</v-icon>
                        </v-badge>
                        <v-badge color="error" content="×" class="ma-4">
                            <v-icon color="white" size="x-large">mdi-close-circle</v-icon>
                        </v-badge>
                    </v-col>
                </v-row>

                <!-- Tonal Colors Section -->
                <v-row class="mt-12">
                    <v-col cols="12">
                        <h3 class="text-h5 mb-6 text-white font-weight-light text-center">Tonal Colors</h3>
                        
                        <!-- Tonal Buttons Row -->
                        <v-row class="justify-center mb-6">
                            <v-col cols="12" class="text-center">
                                <v-btn color="tonalLight" size="large" class="ma-2 px-6 text-white">Tonal Light</v-btn>
                                <v-btn color="tonalMedium" size="large" class="ma-2 px-6 text-white">Tonal Medium</v-btn>
                                <v-btn color="tonalDark" size="large" class="ma-2 px-6 text-white">Tonal Dark</v-btn>
                            </v-col>
                        </v-row>

                        <!-- Tonal Cards Row -->
                        <v-row class="justify-center mb-6">
                            <v-col cols="12" sm="6" md="4">
                                <v-card color="tonalLight" class="theme-demo-card">
                                    <v-card-title class="text-white">Tonal Light</v-card-title>
                                    <v-card-text class="text-white">
                                        Lighter tonal color for subtle backgrounds and highlights.
                                    </v-card-text>
                                </v-card>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-card color="tonalMedium" class="theme-demo-card">
                                    <v-card-title class="text-white">Tonal Medium</v-card-title>
                                    <v-card-text class="text-white">
                                        Medium tonal color for balanced contrast and readability.
                                    </v-card-text>
                                </v-card>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-card color="tonalDark" class="theme-demo-card">
                                    <v-card-title class="text-white">Tonal Dark</v-card-title>
                                    <v-card-text class="text-white">
                                        Darker tonal color for strong contrast and emphasis.
                                    </v-card-text>
                                </v-card>
                            </v-col>
                        </v-row>

                        <!-- Tonal Chips Row -->
                        <v-row class="justify-center mb-6">
                            <v-col cols="12" class="text-center">
                                <v-chip color="tonalLight" size="large" class="ma-2 text-white" label>Light Tonal</v-chip>
                                <v-chip color="tonalMedium" size="large" class="ma-2 text-white" label>Medium Tonal</v-chip>
                                <v-chip color="tonalDark" size="large" class="ma-2 text-white" label>Dark Tonal</v-chip>
                            </v-col>
                        </v-row>

                        <!-- Tonal Progress Bars -->
                        <v-row class="justify-center">
                            <v-col cols="12" md="8">
                                <div class="mb-4">
                                    <p class="text-white mb-2">Tonal Light Progress</p>
                                    <v-progress-linear color="tonalLight" model-value="85" height="10" rounded></v-progress-linear>
                                </div>
                                <div class="mb-4">
                                    <p class="text-white mb-2">Tonal Medium Progress</p>
                                    <v-progress-linear color="tonalMedium" model-value="70" height="10" rounded></v-progress-linear>
                                </div>
                                <div class="mb-4">
                                    <p class="text-white mb-2">Tonal Dark Progress</p>
                                    <v-progress-linear color="tonalDark" model-value="55" height="10" rounded></v-progress-linear>
                                </div>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { theme } from '@/stores'
import { useRouter } from 'vue-router'

const router = useRouter()

// Methods
function selectTheme(themeKey) {
    theme.setTheme(themeKey)
}

function closeThemeSelection() {
    router.push('/')
}
</script>

<style scoped>
.theme-box {
    height: 120px;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 3px solid transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.theme-box:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.2);
}

.theme-box.selected {
    border-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0 8px 25px rgba(255, 255, 255, 0.3);
}

.selected-icon {
    text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.close-btn {
    opacity: 0.8;
    transition: opacity 0.3s ease;
    color: white !important;
}

.close-btn:hover {
    opacity: 1;
}

.theme-demo-card {
    height: 160px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.theme-demo-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.2);
}

.v-progress-linear {
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.v-alert {
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.v-chip {
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.v-badge {
    filter: drop-shadow(0 2px 8px rgba(0,0,0,0.2));
}
</style>
