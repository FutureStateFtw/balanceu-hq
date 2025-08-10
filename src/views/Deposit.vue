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
            <!-- STANDARDIZED SUBPAGE HEADER -->
            <SubpageHeader :backRoute="'/user'" />

            <!-- DIALOG BODY -->
            <div class="std-dialog-body">
                <v-container fluid class="pa-0">
                    
                    <!-- SCREEN 1: SELECT DEPOSIT TYPE -->
                    <div v-if="currentScreen === 'select-type'">
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
                                    @click="selectDepositOption('diningDollars')"
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
                                    @click="selectDepositOption('debitDollars')"
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
                    </div>

                    <!-- SCREEN 2: SELECT AMOUNT -->
                    <div v-else-if="currentScreen === 'select-amount'">
                        <!-- HEADER SECTION -->
                        <v-row class="mb-6">
                            <v-col cols="12" class="text-center">
                                <div class="text-h4 font-weight-light std-text-glass mb-2">
                                    Deposit Funds
                                </div>
                                <div class="text-subtitle-1 std-text-glass-subtitle">
                                    How much would you like to deposit to {{ getDepositTypeLabel() }}?
                                </div>
                            </v-col>
                        </v-row>

                        <!-- PRESET AMOUNTS -->
                        <v-row justify="center" class="mb-6">
                            <v-col cols="12" sm="8" md="6">
                                <v-row>
                                    <v-col v-for="amount in presetAmounts" :key="amount" cols="6" class="mb-4">
                                        <div 
                                            class="std-glass-action-card amount-card text-center py-4"
                                            @click="selectAmount(amount)"
                                        >
                                            <div class="text-h5 font-weight-bold std-text-glass">
                                                ${{ amount }}
                                            </div>
                                        </div>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>

                        <!-- CUSTOM AMOUNT -->
                        <v-row justify="center" class="mb-6">
                            <v-col cols="12" sm="8" md="6">
                                <v-row>
                                    <v-col cols="6">
                                        <v-text-field
                                            v-model="customAmount"
                                            label="Custom"
                                            prefix="$"
                                            type="number"
                                            variant="outlined"
                                            density="comfortable"
                                            class="custom-amount-field"
                                            @keyup.enter="selectCustomAmount"
                                        />
                                    </v-col>
                                    <v-col cols="6">
                                        <v-btn 
                                            class="std-glass-button w-100 pa-4"
                                            size="large"
                                            @click="selectCustomAmount"
                                            :disabled="!customAmount || parseFloat(customAmount) <= 0"
                                        >
                                            Set
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>

                        <!-- BREADCRUMB -->
                        <v-row justify="center">
                            <v-col cols="12" class="text-center">
                                <v-btn 
                                    variant="text" 
                                    class="std-text-glass-muted"
                                    @click="goBackToBucket"
                                >
                                    <v-icon icon="mdi-arrow-left" size="16" class="me-1" />
                                    Change Bucket
                                </v-btn>
                            </v-col>
                        </v-row>
                    </div>

                    <!-- SCREEN 3: SELECT PAYMENT METHOD -->
                    <div v-else-if="currentScreen === 'select-payment'">
                        <!-- HEADER SECTION -->
                        <v-row class="mb-6">
                            <v-col cols="12" class="text-center">
                                <div class="text-h4 font-weight-light std-text-glass mb-2">
                                    Deposit Funds
                                </div>
                                <div class="text-subtitle-1 std-text-glass-subtitle">
                                    You're depositing ${{ selectedAmount.toFixed(2) }} to {{ getDepositTypeLabel() }}.
                                </div>
                            </v-col>
                        </v-row>

                        <!-- PAYMENT OPTIONS -->
                        <v-row justify="center" class="mb-6">
                            <v-col cols="12" sm="8" md="6" lg="5" xl="4">
                                <!-- APPLE PAY -->
                                <div 
                                    class="std-glass-action-card payment-card mb-4"
                                    @click="processPayment('applePay')"
                                >
                                    <v-container fluid class="pa-6">
                                        <v-row align="center" no-gutters>
                                            <v-col cols="auto" class="me-4">
                                                <div class="std-glass-icon-container payment-icon-container">
                                                    <v-icon 
                                                        icon="mdi-apple" 
                                                        size="32" 
                                                        class="std-text-glass"
                                                    />
                                                </div>
                                            </v-col>
                                            <v-col>
                                                <div class="text-h6 font-weight-medium std-text-glass">
                                                    Pay with Apple Pay
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

                                <!-- CREDIT CARD -->
                                <div 
                                    class="std-glass-action-card payment-card"
                                    @click="processPayment('creditCard')"
                                >
                                    <v-container fluid class="pa-6">
                                        <v-row align="center" no-gutters>
                                            <v-col cols="auto" class="me-4">
                                                <div class="std-glass-icon-container payment-icon-container">
                                                    <v-icon 
                                                        icon="mdi-credit-card" 
                                                        size="32" 
                                                        class="std-text-glass"
                                                    />
                                                </div>
                                            </v-col>
                                            <v-col>
                                                <div class="text-h6 font-weight-medium std-text-glass">
                                                    Pay with Credit Card
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

                        <!-- BREADCRUMBS -->
                        <v-row justify="center">
                            <v-col cols="12" class="text-center">
                                <v-btn 
                                    variant="text" 
                                    class="std-text-glass-muted me-4"
                                    @click="goBackToAmount"
                                >
                                    <v-icon icon="mdi-arrow-left" size="16" class="me-1" />
                                    Change Amount
                                </v-btn>
                                <v-btn 
                                    variant="text" 
                                    class="std-text-glass-muted"
                                    @click="goBackToBucket"
                                >
                                    <v-icon icon="mdi-arrow-left" size="16" class="me-1" />
                                    Change Bucket
                                </v-btn>
                            </v-col>
                        </v-row>
                    </div>

                    <!-- HELPER INFO (only on first screen) -->
                    <v-row v-if="currentScreen === 'select-type'" class="mt-8" justify="center">
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
import { ui, user } from '@/stores'
import { useRouter } from 'vue-router'
import { depositFunds } from '@/stores/mockDataUser.js'
import SubpageHeader from '@/components/common/SubpageHeader.vue'

const router = useRouter()
const dialogVisible = ref(false)
const currentScreen = ref('select-type') // 'select-type', 'select-amount', 'select-payment', 'processing'
const selectedDepositType = ref(null)
const selectedAmount = ref(0)
const customAmount = ref('')
const hoveredCard = ref(null)

const presetAmounts = [10, 25, 50, 100]

// Show dialog when component mounts
onMounted(() => {
    dialogVisible.value = true
    // Set page title
    ui.pageTitle = "BalanceU - Deposit Funds"
})

// Methods
function selectDepositOption(type) {
    selectedDepositType.value = type
    currentScreen.value = 'select-amount'
}

function selectAmount(amount) {
    selectedAmount.value = amount
    currentScreen.value = 'select-payment'
}

function selectCustomAmount() {
    const amount = parseFloat(customAmount.value)
    if (amount && amount > 0) {
        selectedAmount.value = amount
        currentScreen.value = 'select-payment'
    }
}

function goBackToAmount() {
    currentScreen.value = 'select-amount'
}

function goBackToBucket() {
    currentScreen.value = 'select-type'
}

async function processPayment(paymentMethod) {
    currentScreen.value = 'processing'
    
    try {
        // Show processing dialog
        ui.confirmDialogType = 'processing'
        ui.confirmDialogTitle = 'Processing Deposit'
        ui.confirmDialogBody = `Processing $${selectedAmount.value.toFixed(2)} deposit to ${getDepositTypeLabel()}...`
        ui.showConfirmDialog = true
        
        // Simulate processing time
        await new Promise(resolve => setTimeout(resolve, 2500))
        
        // Process the deposit
        const userId = user.currentUser?.userId
        const success = depositFunds(userId, selectedDepositType.value, selectedAmount.value)
        
        if (success) {
            // Close processing dialog
            ui.showConfirmDialog = false
            
            // Show success dialog
            const result = await ui.confirm({
                title: 'Deposit Applied!',
                body: `$${selectedAmount.value.toFixed(2)} has been successfully added to your ${getDepositTypeLabel()}.`,
                type: 'Ok'
            })
            
            // Return to user view
            router.push('/user')
        } else {
            throw new Error('Deposit failed')
        }
        
    } catch (error) {
        ui.showConfirmDialog = false
        await ui.confirm({
            title: 'Deposit Failed',
            body: 'There was an error processing your deposit. Please try again.',
            type: 'Ok'
        })
        currentScreen.value = 'select-payment'
    }
}

function getDepositTypeLabel() {
    return selectedDepositType.value === 'diningDollars' ? 'Dining Dollars' : 'Debit Dollars'
}

// Handle browser back button
function handlePopState() {
    if (currentScreen.value === 'select-amount') {
        currentScreen.value = 'select-type'
    } else if (currentScreen.value === 'select-payment') {
        currentScreen.value = 'select-amount'  
    } else {
        dialogVisible.value = false
        setTimeout(() => {
            router.push('/user')
        }, 250)
    }
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

/* AMOUNT SELECTION STYLES - Only specific sizing, use std-glass-action-card for base styling */
.amount-card {
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* CUSTOM AMOUNT FIELD STYLING */
.custom-amount-field :deep(.v-field) {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.87);
}

.custom-amount-field :deep(.v-field--focused) {
    border-color: rgba(255, 255, 255, 0.2);
    background: rgba(255, 255, 255, 0.05);
}

.custom-amount-field :deep(.v-label) {
    color: rgba(255, 255, 255, 0.6) !important;
}

.custom-amount-field :deep(.v-field__prepend-inner) {
    color: rgba(255, 255, 255, 0.6) !important;
}

/* DEPOSIT-SPECIFIC ICON CONTAINER SIZING */
.deposit-icon-container {
    width: 80px;
    height: 80px;
    border-radius: 20px;
}

.payment-icon-container {
    min-width: 48px;
    height: 48px;
    border-radius: 12px;
}

/* RESPONSIVE ADJUSTMENTS FOR DEPOSIT PAGE */
@media (max-width: 960px) {
    .payment-icon-container {
        min-width: 40px;
        height: 40px;
    }
    
    .amount-card {
        height: 70px;
    }
}

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
