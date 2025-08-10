<template>
    <v-container fluid class="pa-4 pa-md-6 liquid-glass-container">

        <!-- OVERVIEW BALANCES -->
        <v-row class="mb-4">
            <v-col v-for="bal in balances" :key="bal.key" cols="12" sm="4" class="d-flex">
                <div class="user-balance-card flex-grow-1" @mouseenter="hoverCard($event)" @mouseleave="leaveCard($event)">
                    <div class="card-inner">
                        <div class="d-flex align-center justify-space-between mb-1">
                            <div class="d-flex align-center">
                                <v-icon :icon="bal.icon" class="mr-2 balance-icon" size="26"></v-icon>
                                <div class="text-body-2 text-white text-opacity-80">{{ bal.label }}</div>
                            </div>
                            <v-btn v-if="bal.canDeposit" variant="text" size="small" class="text-caption text-white text-opacity-90" @click.stop="performBalanceAction(bal)">
                                <v-icon icon="mdi-tray-arrow-down" size="16" class="mr-1"></v-icon>{{ bal.actionLabel }}
                            </v-btn>
                        </div>
                        <div class="text-h5 font-weight-bold text-white mb-1">
                            <template v-if="bal.unit === 'Meal' || bal.key === 'mealTaps'">{{ bal.amount }}</template>
                            <template v-else>${{ bal.amount.toLocaleString(undefined,{minimumFractionDigits:2, maximumFractionDigits:2}) }}</template>
                        </div>
                        <div v-if="bal.availableThisWeek" class="text-caption text-white text-opacity-70 d-flex justify-end">Available This Week&nbsp;<strong>{{ bal.availableThisWeek }}</strong></div>
                        <div class="glass-border-glow"></div>
                    </div>
                </div>
            </v-col>
        </v-row>

        <!-- RECENT TRANSACTIONS -->
        <v-row class="mb-4">
            <v-col cols="12">
                <div class="user-transactions-card">
                    <div class="px-4 py-3 d-flex align-center justify-space-between">
                        <div class="text-subtitle-2 font-weight-medium text-white text-opacity-85">Recent Transactions</div>
                        <v-icon icon="mdi-arrow-up" size="18" class="text-white text-opacity-70"></v-icon>
                    </div>
                    <div class="transaction-list">
                        <div v-for="t in recent" :key="t.id" class="transaction-row">
                            <div class="merchant">
                                <div class="text-body-2 font-weight-medium text-white">{{ t.merchant }}</div>
                                <div class="text-caption text-white text-opacity-60">{{ formatTransactionDate(t.date) }}</div>
                            </div>
                            <div class="amount" :class="{'is-meal': t.amountType==='meal'}">
                                <span v-if="t.amountType==='meal'">-1 Meal</span>
                                <span v-else>{{ formatCurrency(t.amount) }}</span>
                                <v-icon icon="mdi-chevron-right" size="16" class="ml-2 text-white text-opacity-40"></v-icon>
                            </div>
                        </div>
                    </div>
                    <div class="glass-border-glow"></div>
                </div>
            </v-col>
        </v-row>

        <!-- QUICK ACTIONS -->
        <v-row class="mb-12">
            <v-col v-for="qa in quick" :key="qa.key" cols="12" sm="4" class="d-flex">
                <div class="quick-action-card flex-grow-1" @click="triggerQuickAction(qa)" @mouseenter="hoverAction($event)" @mouseleave="leaveAction($event)">
                    <v-icon :icon="qa.icon" size="28" class="mb-2 text-white"></v-icon>
                    <div class="text-body-2 font-weight-medium text-white text-opacity-90">{{ qa.label }}</div>
                    <div class="glass-border-glow"></div>
                </div>
            </v-col>
        </v-row>

        <!-- BOTTOM NAV TOGGLE BUTTON -->
        <div class="bottom-nav-wrapper" :class="{ open: bottomNavOpen }">
            <transition name="fade-slide">
                <div v-if="bottomNavOpen" class="bottom-nav-sheet">
                    <div v-for="act in bottomNav" :key="act.key" class="bottom-nav-item" @click="handleBottomAction(act)">
                        <v-icon :icon="act.icon" size="18" class="mr-3"></v-icon>
                        <span class="text-body-2">{{ act.label }}</span>
                    </div>
                </div>
            </transition>
            <v-btn class="nav-toggle-btn" color="white" variant="flat" size="small" @click="bottomNavOpen = !bottomNavOpen">{{ bottomNavOpen ? 'Close' : 'Navigate' }}</v-btn>
        </div>

        <!-- SIMPLE ACTION DIALOG -->
        <v-dialog v-model="dialog" max-width="420">
            <div class="liquid-glass-panel pa-6">
                <div class="glass-content">
                    <div class="text-h6 mb-2 text-white">{{ dialogTitle }}</div>
                    <div class="text-body-2 mb-6 text-white text-opacity-80">{{ dialogMessage }}</div>
                    <div class="d-flex justify-end">
                        <v-btn variant="text" class="mr-2" @click="dialog=false">Cancel</v-btn>
                        <v-btn color="primary" @click="confirmDialog">Ok</v-btn>
                    </div>
                    <div class="glass-border-glow"></div>
                </div>
            </div>
        </v-dialog>

    </v-container>
</template>

<script setup>
    import { theme, ui } from '@/stores'
    import { getUserBalances, getRecentTransactions, getQuickActions, getBottomNavActions, formatTransactionDate } from '@/stores/mockDataUser.js'
</script>

<script>
export default {
    name: 'UserView',

    data: () => ({
        // Data collections
        balances: [],
        recent: [],
        quick: [],
        bottomNav: [],

        // UI State
        bottomNavOpen: false,
        dialog: false,
        dialogTitle: '',
        dialogMessage: '',
        pendingAction: null,
    }),

    mounted() {
        this.loadData()
    },

    methods: {
        // Load mock arrays
        loadData() {
            this.balances = getUserBalances()
            this.recent = getRecentTransactions(5)
            this.quick = getQuickActions()
            this.bottomNav = getBottomNavActions()
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
            this.openDialog(bal.actionLabel + ' - ' + bal.label, 'This would launch the deposit workflow for ' + bal.label + '.')
        },

        // Quick actions
        triggerQuickAction(qa) {
            this.openDialog(qa.label, 'Simulated action: ' + qa.key)
        },

        // Bottom nav actions
        handleBottomAction(act) {
            this.openDialog(act.label, 'Simulated navigation or action: ' + act.key)
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
/* USER VIEW STYLES */
.user-balance-card {
    position: relative;
    background: linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%);
    border: 1px solid rgba(255,255,255,0.25);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border-radius: 14px;
    padding: 16px 20px 12px 20px;
    overflow: hidden;
    transition: all .4s cubic-bezier(.25,.46,.45,.94);
}
.user-balance-card.hovered {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 14px 32px -4px rgba(0,0,0,0.35), 0 4px 12px rgba(135,206,235,.35);
}
.user-balance-card .card-inner { position: relative; z-index: 2; }
.balance-icon { color: rgba(255,255,255,0.9); }

.user-transactions-card {
    position: relative;
    background: linear-gradient(180deg, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.06) 100%);
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 14px;
    overflow: hidden;
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
}
.transaction-list { padding: 0 12px 12px 12px; }
.transaction-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 12px 8px 12px;
    border-radius: 10px;
    transition: all .35s;
    position: relative;
}
.transaction-row:hover {
    background: linear-gradient(90deg,rgba(255,255,255,.18) 0%, rgba(255,255,255,.06) 100%);
    transform: translateX(4px);
}
.transaction-row + .transaction-row { margin-top: 4px; }
.merchant { flex: 1; min-width: 0; }
.amount { font-weight: 600; color: rgba(255,255,255,0.95); display: flex; align-items: center; }
.amount.is-meal { color: rgba(255,255,255,0.9); }

.quick-action-card {
    position: relative;
    background: linear-gradient(165deg, rgba(255,255,255,.14) 0%, rgba(255,255,255,.05) 100%);
    border: 1px solid rgba(255,255,255,0.25);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border-radius: 14px;
    padding: 26px 12px 20px 12px;
    text-align: center;
    cursor: pointer;
    transition: all .4s cubic-bezier(.25,.46,.45,.94);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.quick-action-card.hovered {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 14px 32px -4px rgba(0,0,0,0.35), 0 4px 12px rgba(135,206,235,.35);
}

.bottom-nav-wrapper {
    position: fixed;
    left: 50%;
    bottom: 20px;
    transform: translateX(-50%);
    z-index: 30;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.bottom-nav-sheet {
    width: 320px;
    margin-bottom: 14px;
    background: linear-gradient(180deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.1) 100%);
    border: 1px solid rgba(255,255,255,0.35);
    backdrop-filter: blur(22px);
    -webkit-backdrop-filter: blur(22px);
    border-radius: 18px;
    padding: 10px 0 4px 0;
    box-shadow: 0 18px 38px -6px rgba(0,0,0,.55), 0 6px 14px rgba(135,206,235,.4);
}
.bottom-nav-item {
    display: flex;
    align-items: center;
    padding: 10px 18px;
    color: rgba(255,255,255,0.92);
    cursor: pointer;
    transition: all .35s;
    border-radius: 12px;
    margin: 2px 8px;
}
.bottom-nav-item:hover {
    background: linear-gradient(90deg, rgba(255,255,255,.28) 0%, rgba(255,255,255,.12) 100%);
    transform: translateX(4px);
}
.nav-toggle-btn {
    border-radius: 24px;
    min-width: 120px;
    font-weight: 500;
    color: #0C234B !important;
}

/* Fade-slide animation */
.fade-slide-enter-active { transition: all .35s cubic-bezier(.25,.46,.45,.94); }
.fade-slide-leave-active { transition: all .25s cubic-bezier(.55,.06,.68,.19); }
.fade-slide-enter-from, .fade-slide-leave-to { opacity: 0; transform: translateY(12px); }

/* Glow border reused */
.glass-border-glow { pointer-events:none; }

@media (max-width: 600px) {
    .user-balance-card { padding: 14px 16px 10px 16px; }
    .quick-action-card { padding: 22px 12px 16px 12px; }
    .bottom-nav-sheet { width: 280px; }
}
</style>
