<template>
    <!-- FULL SCREEN DEPOSIT DIALOG -->
    <v-dialog 
        v-model="dialogVisible" 
        fullscreen 
        hide-overlay 
        transition="dialog-bottom-transition"
        persistent
        class="std-fullscreen-dialog"
    >
        <div class="gradient-background std-dialog-content">
            <!-- CUSTOM APP BAR -->
            <div class="std-subpage-header">
                <v-container fluid class="pa-0">
                    <v-row no-gutters align="center" class="pa-4">
                        <v-col cols="auto">
                            <v-btn
                                @click="goBack"
                                icon="mdi-arrow-left"
                                variant="text"
                                class="std-back-button me-3"
                                size="large"
                            />
                        </v-col>
                        <v-col>
                            <div class="text-h5 font-weight-medium std-text-glass">
                                Deposit Funds
                            </div>
                        </v-col>
                    </v-row>
                </v-container>
            </div>

            <!-- DIALOG BODY -->
            <div class="std-dialog-body">
                <v-container fluid class="pa-0">
                    <!-- HEADER SECTION -->
                    <v-row class="mb-8">
                        <v-col cols="12" class="text-center">
                            <div class="text-h4 font-weight-light std-text-glass mb-2">
                                Deposit Funds
                            </div>
                            <div class="text-subtitle-1 std-text-glass-subtitle">
                                Choose where you'd like to add funds
                            </div>
                        </v-col>
                    </v-row>

                    <!-- DEPOSIT OPTIONS -->
                    <v-row justify="center" class="deposit-options">
                        <v-col cols="12" sm="8" md="6" lg="5" xl="4">
                            <!-- DEPOSIT TO DINING DOLLARS -->
                            <div 
                                class="std-glass-action-card deposit-card mb-6"
                                @click="selectDepositOption('dining')"
                                @mouseenter="hoveredCard = 'dining'"
                                @mouseleave="hoveredCard = null"
                            >
                                <div class="std-glass-border-glow" v-show="hoveredCard === 'dining'" />
                                
                                <v-container fluid class="pa-6">
                                    <v-row align="center" no-gutters>
                                        <v-col cols="auto" class="me-4">
                                            <div class="std-glass-icon-container deposit-icon-container">
                                                <v-icon 
                                                    icon="mdi-cash" 
                                                    size="48" 
                                                    class="std-text-glass"
                                                />
                                            </div>
                                        </v-col>
                                        <v-col>
                                            <div class="text-h6 font-weight-medium std-text-glass mb-1">
                                                Deposit to Dining Dollars
                                            </div>
                                            <div class="text-body-2 std-text-glass-subtitle">
                                                Add funds for dining purchases on campus
                                            </div>
                                        </v-col>
                                        <v-col cols="auto">
                                            <v-icon 
                                                icon="mdi-chevron-right" 
                                                class="std-text-glass-muted"
                                            />
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </div>

                            <!-- DEPOSIT TO DEBIT DOLLARS -->
                            <div 
                                class="std-glass-action-card deposit-card"
                                @click="selectDepositOption('debit')"
                                @mouseenter="hoveredCard = 'debit'"
                                @mouseleave="hoveredCard = null"
                            >
                                <div class="std-glass-border-glow" v-show="hoveredCard === 'debit'" />
                                
                                <v-container fluid class="pa-6">
                                    <v-row align="center" no-gutters>
                                        <v-col cols="auto" class="me-4">
                                            <div class="std-glass-icon-container deposit-icon-container">
                                                <v-icon 
                                                    icon="mdi-credit-card-outline" 
                                                    size="48" 
                                                    class="std-text-glass"
                                                />
                                            </div>
                                        </v-col>
                                        <v-col>
                                            <div class="text-h6 font-weight-medium std-text-glass mb-1">
                                                Deposit to Debit Dollars
                                            </div>
                                            <div class="text-body-2 std-text-glass-subtitle">
                                                Add general purpose funds for campus purchases
                                            </div>
                                        </v-col>
                                        <v-col cols="auto">
                                            <v-icon 
                                                icon="mdi-chevron-right" 
                                                class="std-text-glass-muted"
                                            />
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </div>
                        </v-col>
                    </v-row>

                    <!-- HELPER INFO -->
                    <v-row class="mt-8" justify="center">
                        <v-col cols="12" sm="8" md="6" lg="5" xl="4">
                            <div class="std-glass-panel pa-4">
                                <div class="text-body-2 std-text-glass-subtitle text-center">
                                    <v-icon icon="mdi-information-outline" class="me-2" size="small" />
                                    Deposits are processed securely and will appear in your account within minutes
                                </div>
                            </div>
                        </v-col>
                    </v-row>
                </v-container>
            </div>
        </div>
    </v-dialog>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { ui } from '@/stores'
import { useRouter } from 'vue-router'

const router = useRouter()
const dialogVisible = ref(false)
const hoveredCard = ref(null)

// Show dialog when component mounts
onMounted(() => {
    dialogVisible.value = true
    // Set page title
    ui.pageTitle = "BalanceU - Deposit Funds"
})

// Methods
function goBack() {
    dialogVisible.value = false
    // Small delay to allow dialog transition
    setTimeout(() => {
        router.push('/user')
    }, 250)
}

function selectDepositOption(type) {
    // Placeholder for future functionality
    console.log(`Selected deposit option: ${type}`)
    // TODO: Navigate to specific deposit flow
}

// Handle browser back button
function handlePopState() {
    goBack()
}

onMounted(() => {
    window.addEventListener('popstate', handlePopState)
})

onUnmounted(() => {
    window.removeEventListener('popstate', handlePopState)
})
</script>

<script>
export default {
    name: 'DepositView'
}
</script>

<style scoped>
/* DEPOSIT-SPECIFIC LAYOUT STYLES */
.deposit-options {
    min-height: 300px;
}

.deposit-card {
    min-height: 120px;
    display: flex;
    align-items: center;
}

/* DEPOSIT-SPECIFIC ICON CONTAINER SIZING */
.deposit-icon-container {
    width: 80px;
    height: 80px;
    border-radius: 20px;
}

/* RESPONSIVE ADJUSTMENTS FOR DEPOSIT PAGE */
@media (max-width: 600px) {
    .deposit-icon-container {
        width: 60px;
        height: 60px;
        border-radius: 15px;
    }
    
    .deposit-card {
        min-height: 100px;
    }
    
    .deposit-icon-container .v-icon {
        font-size: 36px !important;
    }
}

@media (min-width: 1200px) {
    .deposit-icon-container {
        width: 90px;
        height: 90px;
        border-radius: 24px;
    }
}
</style>
