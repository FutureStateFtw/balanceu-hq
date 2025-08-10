<template>
    <v-container fluid class="pa-4 pa-md-6 liquid-glass-container">

        <!-- OVERVIEW BALANCES -->
        <v-row class="mb-4">
            <v-col v-for="bal in balances" :key="bal.key" cols="12" sm="4" class="d-flex">
                <div class="std-glass-card balance-card flex-grow-1" 
                     @mouseenter="hoverCard($event)" 
                     @mouseleave="leaveCard($event)"
                     @click="bal.key === 'diningDollars' || bal.key === 'debitDollars' || bal.key === 'mealTaps' ? toggleBalanceDropdown(bal.key) : null"
                     :class="{ 'balance-card-clickable': bal.key === 'diningDollars' || bal.key === 'debitDollars' || bal.key === 'mealTaps' }">
                    <div class="card-inner pa-4">
                        <div class="d-flex align-center justify-space-between mb-1">
                            <div class="d-flex align-center">
                                <v-icon :icon="bal.icon" class="mr-2 balance-icon" size="26"></v-icon>
                                <div class="text-body-2 std-text-glass-subtitle">{{ bal.label }}</div>
                            </div>
                            <v-btn v-if="bal.canDeposit" variant="text" size="small" class="text-caption std-text-glass-subtitle" @click.stop="performBalanceAction(bal)">
                                <v-icon icon="mdi-tray-arrow-down" size="16" class="mr-1"></v-icon>{{ bal.actionLabel }}
                            </v-btn>
                        </div>
                        <div class="text-h5 font-weight-bold std-text-glass mb-1">
                            <template v-if="bal.unit === 'Meal' || bal.key === 'mealTaps'">{{ bal.amount }}</template>
                            <template v-else>${{ bal.amount.toLocaleString(undefined,{minimumFractionDigits:2, maximumFractionDigits:2}) }}</template>
                        </div>
                        <div v-if="bal.availableThisWeek" class="text-caption std-text-glass-muted d-flex justify-end">Available This Week&nbsp;<strong>{{ bal.availableThisWeek }}</strong></div>
                        
                        <!-- BALANCE TRANSACTIONS DROPDOWN -->
                        <v-expand-transition>
                            <div v-show="balanceDropdowns[bal.key]" class="mt-3">
                                <v-divider class="mb-2 std-glass-divider"></v-divider>
                                <div class="text-caption std-text-glass-subtitle mb-2">Recent {{ bal.label }} Activity</div>
                                <div v-if="getBalanceTransactions(bal.key).length === 0" class="text-caption std-text-glass-muted py-2 text-center">
                                    No recent {{ bal.label.toLowerCase() }} transactions
                                </div>
                                <div v-for="t in getBalanceTransactions(bal.key)" :key="t.id" class="balance-transaction-row">
                                    <div class="d-flex justify-space-between align-center py-2">
                                        <div class="flex-grow-1">
                                            <div class="text-caption std-text-glass-muted">{{ t.merchant }}</div>
                                            <div class="text-caption std-text-glass-muted" style="font-size: 0.7rem; opacity: 0.7;">
                                                {{ formatTransactionDate(t.date) }}
                                            </div>
                                        </div>
                                        <div class="text-caption" :class="t.amount > 0 ? 'text-green-lighten-2' : 'std-text-glass'">
                                            {{ t.amountType === 'meal' ? `${Math.abs(t.amount)} Meal${Math.abs(t.amount) !== 1 ? 's' : ''}` : formatCurrency(t.amount) }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </v-expand-transition>
                        
                        <div class="std-glass-border-glow"></div>
                    </div>
                </div>
            </v-col>
        </v-row>

        <!-- ALL TRANSACTIONS -->
        <v-row class="mb-4">
            <v-col cols="12">
                <div class="std-glass-panel">
                    <div class="px-4 py-6 d-flex align-center justify-space-between" @click="transactionsOpen = !transactionsOpen" style="cursor: pointer;">
                        <div class="text-subtitle-2 font-weight-medium std-text-glass-subtitle">All Transactions</div>
                        <v-icon :icon="transactionsOpen ? 'mdi-chevron-up' : 'mdi-chevron-down'" size="18" class="std-text-glass-muted"></v-icon>
                    </div>
                    <v-expand-transition>
                        <div v-show="transactionsOpen" class="transaction-list-container">
                            <v-virtual-scroll
                                :items="allTransactions"
                                height="200"
                                item-height="72"
                                class="transaction-virtual-scroll"
                            >
                                <template v-slot:default="{ item }">
                                    <div class="transaction-row">
                                        <div class="merchant">
                                            <div class="text-body-2 font-weight-medium std-text-glass">{{ item.merchant }}</div>
                                            <div class="text-caption std-text-glass-muted">{{ formatTransactionDate(item.date) }}</div>
                                        </div>
                                        <div class="amount" :class="{'is-meal': item.amountType==='meal'}">
                                            <span v-if="item.amountType==='meal'">{{ Math.abs(item.amount) }} Meal{{ Math.abs(item.amount) !== 1 ? 's' : '' }}</span>
                                            <span v-else>{{ formatCurrency(item.amount) }}</span>
                                            <v-icon icon="mdi-chevron-right" size="16" class="ml-2 std-text-glass-muted"></v-icon>
                                        </div>
                                    </div>
                                </template>
                            </v-virtual-scroll>
                        </div>
                    </v-expand-transition>
                </div>
            </v-col>
        </v-row>

        <!-- QUICK ACTIONS -->
        <v-row class="mb-12">
            <v-col v-for="qa in quick" :key="qa.key" cols="12" sm="4" class="d-flex">
                <div class="std-glass-action-card quick-action-card flex-grow-1 pa-6 text-center" @click="triggerQuickAction(qa)" @mouseenter="hoverAction($event)" @mouseleave="leaveAction($event)">
                    <v-icon :icon="qa.icon" size="28" class="mb-2 std-text-glass"></v-icon>
                    <div class="text-body-2 font-weight-medium std-text-glass">{{ qa.label }}</div>
                    <div class="std-glass-border-glow"></div>
                </div>
            </v-col>
        </v-row>

        <!-- BOTTOM NAV TOGGLE BUTTON -->
        <div class="bottom-nav-wrapper" :class="{ open: bottomNavOpen }">
            <transition name="std-fade-slide">
                <div v-if="bottomNavOpen" class="bottom-nav-sheet">
                    <div v-for="act in bottomNav" :key="act.key" class="bottom-nav-item" @click="handleBottomAction(act)">
                        <v-icon :icon="act.icon" size="18" class="mr-3"></v-icon>
                        <span class="text-body-2">{{ act.label }}</span>
                    </div>
                </div>
            </transition>
            <v-btn class="nav-toggle-btn" color="white" variant="flat" size="large" @click="bottomNavOpen = !bottomNavOpen">{{ bottomNavOpen ? 'Close' : 'Navigate' }}</v-btn>
        </div>

        <!-- SIMPLE ACTION DIALOG -->
        <v-dialog v-model="dialog" max-width="420">
            <div class="std-glass-panel pa-6">
                <div class="glass-content">
                    <div class="text-h6 mb-2 std-text-glass">{{ dialogTitle }}</div>
                    <div class="text-body-2 mb-6 std-text-glass-subtitle">{{ dialogMessage }}</div>
                    <div class="d-flex justify-end">
                        <v-btn variant="text" class="mr-2 std-text-glass-subtitle" @click="dialog=false">Cancel</v-btn>
                        <v-btn color="primary" @click="confirmDialog">Ok</v-btn>
                    </div>
                </div>
            </div>
        </v-dialog>

    </v-container>
</template>

<script setup>
    import { theme, ui, user } from '@/stores'
    import { getUserBalances, getRecentTransactions, getTransactionsByBalanceType, getQuickActions, getBottomNavActions, formatTransactionDate } from '@/stores/mockDataUser.js'
</script>

<script>
export default {
    name: 'UserView',

    data: () => ({
        // Data collections
        balances: [],
        recent: [],
        allTransactions: [],
        quick: [],
        bottomNav: [],

        // UI State
        bottomNavOpen: false,
        transactionsOpen: false,
        balanceDropdowns: {
            diningDollars: false,
            debitDollars: false,
            mealTaps: false
        },
        dialog: false,
        dialogTitle: '',
        dialogMessage: '',
        pendingAction: null,
    }),

    mounted() {
        this.loadData()
    },

    methods: {
        // Load per-user data
        loadData() {
            const userId = user.currentUser?.userId
            if (!userId) return
            
            this.balances = getUserBalances(userId)
            this.recent = getRecentTransactions(userId, 5)
            this.allTransactions = getRecentTransactions(userId, 50) // Load more transactions for scrolling
            this.quick = getQuickActions()
            this.bottomNav = getBottomNavActions()
        },

        // Get transactions for specific balance type
        getBalanceTransactions(balanceType) {
            const userId = user.currentUser?.userId
            if (!userId) return []
            
            // Use the new filtering function from mockDataUser
            return getTransactionsByBalanceType(userId, balanceType, 5)
        },

        // Toggle balance dropdown
        toggleBalanceDropdown(balanceType) {
            this.balanceDropdowns[balanceType] = !this.balanceDropdowns[balanceType]
        },

        // Format currency amount
        formatCurrency(val) {
            return (val < 0 ? '-' : '') + '$' + Math.abs(val).toFixed(2)
        },

        formatTransactionDate(date) {
            return formatTransactionDate(date)
        },

        // Hover effects
        hoverCard(e) { e.currentTarget.classList.add('hovered') },
        leaveCard(e) { e.currentTarget.classList.remove('hovered') },
        hoverAction(e) { e.currentTarget.classList.add('hovered') },
        leaveAction(e) { e.currentTarget.classList.remove('hovered') },

        // Balance card deposit or similar action
        performBalanceAction(bal) {
            if (bal.canDeposit) {
                // Navigate to deposit page
                this.$router.push('/deposit')
            } else {
                this.openDialog(bal.actionLabel + ' - ' + bal.label, 'This would launch the workflow for ' + bal.label + '.')
            }
        },

        // Quick actions
        triggerQuickAction(qa) {
            if (qa.key === 'depositFunds') {
                // Navigate to deposit page
                this.$router.push('/deposit')
            } else {
                this.openDialog(qa.label, 'Simulated action: ' + qa.key)
            }
        },

        // Bottom nav actions
        handleBottomAction(act) {
            if (act.key === 'depositFunds') {
                // Navigate to deposit page
                this.$router.push('/deposit')
            } else {
                this.openDialog(act.label, 'Simulated navigation or action: ' + act.key)
            }
        },

        openDialog(title, msg) {
            this.dialogTitle = title
            this.dialogMessage = msg
            this.dialog = true
        },

        confirmDialog() {
            ui.snackText = this.dialogTitle + ' executed'
            ui.snackColor = 'success'
            ui.snack = true
            this.dialog = false
        }
    }
}
</script>

<style scoped>
/* Text color overrides */
.std-text-glass {
    color: white !important;
}

.std-text-glass-subtitle {
    color: rgba(255, 255, 255, 0.8) !important;
}

.std-text-glass-muted {
    color: rgba(255, 255, 255, 0.6) !important;
}

.balance-card .card-inner { 
    position: relative; 
    z-index: 2; 
}

.balance-card-clickable {
    cursor: pointer;
}

.balance-card-clickable:hover {
    transform: translateY(-2px) scale(1.01);
}

.balance-icon { 
    color: rgba(255, 255, 255, 0.9) !important; 
}

.balance-transaction-row {
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.balance-transaction-row:last-child {
    border-bottom: none;
}

.quick-action-card {
    min-height: 120px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.transaction-list { 
    padding: 0 12px 12px 12px; 
}

.transaction-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 12px 8px 12px;
    border-radius: 10px;
    transition: all 0.35s;
    position: relative;
}

.transaction-row:hover {
    background: linear-gradient(90deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.06) 100%);
    transform: translateX(4px);
}

.transaction-row + .transaction-row { 
    margin-top: 4px; 
}

.merchant { 
    flex: 1; 
    min-width: 0; 
}

.amount { 
    font-weight: 600; 
    color: rgba(255, 255, 255, 0.95) !important; 
    display: flex; 
    align-items: center; 
}

.amount.is-meal { 
    color: rgba(255, 255, 255, 0.9) !important; 
}

.transaction-list-container {
    max-height: 400px;
    overflow: hidden;
}

.transaction-virtual-scroll {
    background: transparent;
    overflow-x: hidden;
}

.transaction-virtual-scroll :deep(.v-virtual-scroll__container) {
    background: transparent;
}

.balance-transaction-row {
    border-radius: 6px;
    transition: all 0.25s;
}

.balance-transaction-row:hover {
    background: rgba(255, 255, 255, 0.08);
}

.bottom-nav-wrapper {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;
    transition: all 0.35s;
}

.bottom-nav-sheet {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.25);
    border-radius: 16px 16px 4px 4px;
    padding: 16px 20px 8px 20px;
    margin-bottom: 8px;
    min-width: 280px;
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
}

.bottom-nav-item {
    display: flex;
    align-items: center;
    padding: 8px 12px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.25s;
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 4px;
}

.bottom-nav-item:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateX(4px);
}

.nav-toggle-btn {
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.nav-toggle-btn::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transform: rotate(-45deg);
    transition: all 0.4s;
    opacity: 0;
}

.nav-toggle-btn:hover::before {
    opacity: 1;
    transform: rotate(-45deg) translate(25%, 25%);
}

@media (max-width: 600px) {
    .balance-card .card-inner {
        padding: 12px 16px !important;
    }
    
    .quick-action-card {
        min-height: 100px;
        padding: 20px 12px !important;
    }
    
    .bottom-nav-sheet {
        min-width: 260px;
        margin-left: 10px;
        margin-right: 10px;
    }
}
</style>
