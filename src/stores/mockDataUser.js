// mockDataUser.js - Fake user-centric data for the BalanceU "User" dashboard view
// Mirrors style of mockData.js but focused on a single authenticated user's balances and activity
// Remove/replace when real API endpoints are connected

// USER BALANCE TYPES (Dining Dollars, Debit Dollars, Meal Taps)
export const userBalances = [
  {
    key: 'diningDollars',
    label: 'Dining Dollars',
    amount: 1.12,            // Example small balance
    canDeposit: true,
    icon: 'mdi-cash',
    actionLabel: 'Deposit'
  },
  {
    key: 'debitDollars',
    label: 'Debit Dollars',
    amount: 177.73,
    canDeposit: true,
    icon: 'mdi-credit-card-outline',
    actionLabel: 'Deposit'
  },
  {
    key: 'mealTaps',
    label: 'Meal Taps',
    amount: 121,            // Remaining meal taps overall
    availableThisWeek: 4,    // Shows on right side of card
    unit: 'Meal',
    canDeposit: false,
    icon: 'mdi-silverware-fork-knife'
  }
]

// QUICK ACTION BUTTONS (Row of 3) - Request, Deposit, Gift
export const quickActions = [
  { key: 'requestFunds', label: 'Request Funds', icon: 'mdi-account-arrow-left', color: 'primary' },
  { key: 'depositFunds', label: 'Deposit Funds', icon: 'mdi-cash-plus', color: 'success' },
  { key: 'giftMeals', label: 'Gift Meals', icon: 'mdi-gift', color: 'pink' }
]

// BOTTOM NAV ACTIONS (Shown when nav expands)
export const bottomNavActions = [
  { key: 'viewBalances', label: 'View Balances', icon: 'mdi-cash-multiple' },
  { key: 'giftMeals', label: 'Gift/Donate Meals', icon: 'mdi-gift-outline' },
  { key: 'depositFunds', label: 'Deposit Funds', icon: 'mdi-bank-transfer-in' },
  { key: 'viewTransactions', label: 'View Transactions', icon: 'mdi-format-list-bulleted' },
  { key: 'mealPlanInfo', label: 'Meal Plan Information', icon: 'mdi-information-outline' },
  { key: 'contactSupport', label: 'Contact Support', icon: 'mdi-lifebuoy' }
]

// Recent transactions (subset for card list) - Provide realistic mix
// amountType: 'currency' | 'meal' to support formatting differences
// Negative amounts represent spend / usage
export const recentTransactions = [
  {
    id: 1,
    merchant: 'The Pizza Spot',
    amount: -15.94,
    amountType: 'currency',
    date: new Date(Date.now() - 1000 * 60 * 60 * 25) // ~25 hours ago
  },
  {
    id: 2,
    merchant: 'The Buffet',
    amount: -1,
    amountType: 'meal',
    date: new Date(Date.now() - 1000 * 60 * 60 * 96) // ~4 days ago
  },
  {
    id: 3,
    merchant: 'Coffee Place',
    amount: -1.27,
    amountType: 'currency',
    date: new Date(Date.now() - 1000 * 60 * 60 * 120) // ~5 days ago
  }
]

// Utility to generate a formatted date/time string
export function formatTransactionDate(date) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  }).format(date)
}

// Add a new fake transaction (for future live updates extension)
export function generateUserTransaction() {
  const merchants = ['Campus Market', 'Dining Hall East', 'Tea Lounge', 'Sushi Bar', 'Grill House']
  const merchant = merchants[Math.floor(Math.random() * merchants.length)]
  const isMeal = Math.random() < 0.2
  const amount = isMeal ? -1 : -(Math.random() * 18 + 2)
  return {
    id: Date.now(),
    merchant,
    amount: Math.round(amount * 100) / 100,
    amountType: isMeal ? 'meal' : 'currency',
    date: new Date()
  }
}

// Clone helpers to avoid accidental mutation of base arrays
export function getUserBalances() { return userBalances.map(b => ({ ...b })) }
export function getRecentTransactions(limit = 10) {
  return recentTransactions
    .slice() // clone
    .sort((a, b) => b.date - a.date)
    .slice(0, limit)
    .map(t => ({ ...t }))
}
export function getBottomNavActions() { return bottomNavActions.map(a => ({ ...a })) }
export function getQuickActions() { return quickActions.map(a => ({ ...a })) }
