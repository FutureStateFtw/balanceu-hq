// mockDataUser.js - Per-user data storage with localStorage persistence
// Handles balances, transactions, and deposit history per authenticated user
// Remove/replace when real API endpoints are connected

const STORAGE_KEY = 'balanceUAdmin_userData'

// DEFAULT USER DATA STRUCTURE
const defaultUserData = {
  balances: {
    diningDollars: 1.12,
    debitDollars: 177.73,
    mealTaps: 121,
    mealTapsAvailableThisWeek: 4
  },
  transactions: [
    {
      id: 1,
      merchant: 'The Pizza Spot',
      amount: -15.94,
      amountType: 'currency',
      balanceType: 'diningDollars',
      type: 'purchase',
      date: new Date(Date.now() - 1000 * 60 * 60 * 25).toISOString()
    },
    {
      id: 2,
      merchant: 'The Buffet',
      amount: -1,
      amountType: 'meal',
      balanceType: 'mealTaps',
      type: 'purchase',
      date: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString()
    },
    {
      id: 3,
      merchant: 'Coffee Place',
      amount: -1.27,
      amountType: 'currency',
      balanceType: 'debitDollars',
      type: 'purchase',
      date: new Date(Date.now() - 1000 * 60 * 60 * 120).toISOString()
    },
    {
      id: 4,
      merchant: 'Campus Grill',
      amount: -8.75,
      amountType: 'currency',
      balanceType: 'diningDollars',
      type: 'purchase',
      date: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString()
    },
    {
      id: 5,
      merchant: 'Student Store',
      amount: -23.50,
      amountType: 'currency',
      balanceType: 'debitDollars',
      type: 'purchase',
      date: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString()
    },
    {
      id: 6,
      merchant: 'Dining Hall West',
      amount: -1,
      amountType: 'meal',
      balanceType: 'mealTaps',
      type: 'purchase',
      date: new Date(Date.now() - 1000 * 60 * 60 * 144).toISOString()
    },
    {
      id: 7,
      merchant: 'Smoothie Bar',
      amount: -6.25,
      amountType: 'currency',
      balanceType: 'diningDollars',
      type: 'purchase',
      date: new Date(Date.now() - 1000 * 60 * 60 * 168).toISOString()
    },
    {
      id: 8,
      merchant: 'Bookstore',
      amount: -45.99,
      amountType: 'currency',
      balanceType: 'debitDollars',
      type: 'purchase',
      date: new Date(Date.now() - 1000 * 60 * 60 * 192).toISOString()
    },
    {
      id: 9,
      merchant: 'Late Night Grill',
      amount: -1,
      amountType: 'meal',
      balanceType: 'mealTaps',
      type: 'purchase',
      date: new Date(Date.now() - 1000 * 60 * 60 * 216).toISOString()
    },
    {
      id: 10,
      merchant: 'Taco Stand',
      amount: -4.50,
      amountType: 'currency',
      balanceType: 'diningDollars',
      type: 'purchase',
      date: new Date(Date.now() - 1000 * 60 * 60 * 240).toISOString()
    }
  ]
}

// STORAGE HELPERS
function loadUserData() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : {}
  } catch (e) {
    console.warn('Failed to load user data from localStorage:', e)
    return {}
  }
}

function saveUserData(allUserData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allUserData))
  } catch (e) {
    console.warn('Failed to save user data to localStorage:', e)
  }
}

function getUserDataById(userId) {
  const allUserData = loadUserData()
  if (!allUserData[userId]) {
    allUserData[userId] = JSON.parse(JSON.stringify(defaultUserData))
    saveUserData(allUserData)
  }
  return allUserData[userId]
}

function updateUserData(userId, userData) {
  const allUserData = loadUserData()
  allUserData[userId] = userData
  saveUserData(allUserData)
}

// USER BALANCE FUNCTIONS (now per-user)
export function getUserBalances(userId) {
  if (!userId) return []
  
  const userData = getUserDataById(userId)
  
  return [
    {
      key: 'diningDollars',
      label: 'Dining Dollars',
      amount: userData.balances.diningDollars,
      canDeposit: true,
      icon: 'mdi-cash',
      actionLabel: 'Deposit'
    },
    {
      key: 'debitDollars', 
      label: 'Debit Dollars',
      amount: userData.balances.debitDollars,
      canDeposit: true,
      icon: 'mdi-credit-card-outline',
      actionLabel: 'Deposit'
    },
    {
      key: 'mealTaps',
      label: 'Meal Taps',
      amount: userData.balances.mealTaps,
      availableThisWeek: userData.balances.mealTapsAvailableThisWeek,
      unit: 'Meal',
      canDeposit: false,
      icon: 'mdi-silverware-fork-knife'
    }
  ]
}

// DEPOSIT FUNDS TO USER ACCOUNT
export function depositFunds(userId, depositType, amount) {
  if (!userId || !depositType || !amount) return false
  
  const userData = getUserDataById(userId)
  
  // Update balance
  if (depositType === 'diningDollars') {
    userData.balances.diningDollars += amount
  } else if (depositType === 'debitDollars') {
    userData.balances.debitDollars += amount
  } else {
    return false
  }
  
  // Add transaction record
  const transaction = {
    id: Date.now(),
    merchant: 'Deposit',
    amount: amount,
    amountType: 'currency',
    balanceType: depositType,
    type: 'deposit',
    date: new Date().toISOString()
  }
  
  userData.transactions.unshift(transaction)
  
  // Keep only last 100 transactions
  if (userData.transactions.length > 100) {
    userData.transactions = userData.transactions.slice(0, 100)
  }
  
  updateUserData(userId, userData)
  return true
}

// GET RECENT TRANSACTIONS FOR USER
export function getRecentTransactions(userId, limit = 10) {
  if (!userId) return []
  
  const userData = getUserDataById(userId)
  
  return userData.transactions
    .slice(0, limit)
    .map(t => ({
      ...t,
      date: new Date(t.date) // Convert back to Date object
    }))
}

// GET TRANSACTIONS BY BALANCE TYPE (for dropdown filtering)
export function getTransactionsByBalanceType(userId, balanceType, limit = 10) {
  if (!userId || !balanceType) return []
  
  const userData = getUserDataById(userId)
  
  return userData.transactions
    .filter(t => t.balanceType === balanceType)
    .slice(0, limit)
    .map(t => ({
      ...t,
      date: new Date(t.date) // Convert back to Date object
    }))
}

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
export function getBottomNavActions() { return bottomNavActions.map(a => ({ ...a })) }
export function getQuickActions() { return quickActions.map(a => ({ ...a })) }

// DEBUG: Reset user data (for testing)
export function resetUserData(userId) {
  const allUserData = loadUserData()
  allUserData[userId] = JSON.parse(JSON.stringify(defaultUserData))
  saveUserData(allUserData)
  console.log(`Reset user data for ${userId}:`, allUserData[userId])
  return allUserData[userId]
}
