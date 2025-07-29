// mockData.js - Fake data for development/demo purposes
// Remove this file when connecting to real APIs

export const mockTransactions = [
  {
    id: 1,
    timestamp: new Date(Date.now() - Math.random() * 86400000), // Random time in last 24 hours
    location: "Student Union Food Court",
    item: "Chicken Caesar Salad",
    balance_type: "Dining Cash",
    amount: -12.50,
    remaining_balance: 487.25,
    student_id: "SU20240001",
    student_name: "Alex Johnson"
  },
  {
    id: 2,
    timestamp: new Date(Date.now() - Math.random() * 86400000),
    location: "Library Café",
    item: "Large Coffee & Muffin",
    balance_type: "Flex Plan",
    amount: -8.75,
    remaining_balance: 231.50,
    student_id: "SU20240002",
    student_name: "Sarah Chen"
  },
  {
    id: 3,
    timestamp: new Date(Date.now() - Math.random() * 86400000),
    location: "Dining Hall West",
    item: "Dinner Buffet",
    balance_type: "Meal Swipe",
    amount: -1,
    remaining_balance: 187,
    student_id: "SU20240003",
    student_name: "Mike Rodriguez"
  }
];

// Generate more realistic mock data
const locations = [
  "Student Union Food Court",
  "Library Café", 
  "Dining Hall West",
  "Dining Hall East",
  "Campus Market",
  "Sports Center Grill",
  "Engineering Building Café",
  "Medical Center Cafeteria",
  "Arts Building Snack Bar",
  "Business School Restaurant"
];

const items = [
  "Chicken Caesar Salad", "Large Coffee & Muffin", "Dinner Buffet", "Breakfast Special",
  "Turkey Sandwich", "Pasta Bowl", "Sushi Roll", "Pizza Slice", "Energy Drink",
  "Fruit Smoothie", "Bagel with Cream Cheese", "Burger & Fries", "Vegetarian Wrap",
  "Chicken Tenders", "Salad Bar", "Soup & Bread", "Stir Fry", "Grilled Cheese",
  "Fish & Chips", "Tacos", "Ramen Bowl", "Protein Bar", "Bottled Water",
  "Sandwich Combo", "Hot Dog", "Nachos", "Ice Cream", "Cookies"
];

const balanceTypes = ["Dining Cash", "Flex Plan", "Meal Swipe"];

const firstNames = ["Alex", "Sarah", "Mike", "Emma", "David", "Lisa", "Chris", "Maria", "Ryan", "Kate"];
const lastNames = ["Johnson", "Chen", "Rodriguez", "Smith", "Brown", "Davis", "Wilson", "Garcia", "Miller", "Jones"];

// Generate 100 mock transactions
export const generateMockTransactions = (count = 100) => {
  const transactions = [];
  
  for (let i = 0; i < count; i++) {
    const balanceType = balanceTypes[Math.floor(Math.random() * balanceTypes.length)];
    let amount, remaining;
    
    if (balanceType === "Meal Swipe") {
      amount = -1;
      remaining = Math.floor(Math.random() * 200) + 50;
    } else {
      amount = -(Math.random() * 25 + 3); // $3-$28
      remaining = Math.random() * 500 + 50; // $50-$550
    }
    
    transactions.push({
      id: i + 1,
      timestamp: new Date(Date.now() - Math.random() * 604800000), // Random time in last week
      location: locations[Math.floor(Math.random() * locations.length)],
      item: items[Math.floor(Math.random() * items.length)],
      balance_type: balanceType,
      amount: Math.round(amount * 100) / 100,
      remaining_balance: Math.round(remaining * 100) / 100,
      student_id: `SU2024${String(Math.floor(Math.random() * 9999) + 1).padStart(4, '0')}`,
      student_name: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`
    });
  }
  
  return transactions.sort((a, b) => b.timestamp - a.timestamp);
};

// Generate live chart data
export const generateChartData = () => {
  const now = new Date();
  const data = [];
  
  // Generate data for last 30 minutes
  for (let i = 29; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 60000); // Every minute
    const transactionCount = Math.floor(Math.random() * 15) + 2; // 2-16 transactions per minute
    const dollarAmount = Math.round((Math.random() * 200 + 50) * 100) / 100; // $50-$250 per minute
    
    data.push({
      timestamp,
      transactionCount,
      dollarAmount
    });
  }
  
  return data;
};

// Mock system alerts
export const mockAlerts = [
  {
    id: 1,
    system_name: "Payment Processor Alpha",
    status: "unresponsive",
    last_seen: new Date(Date.now() - 300000), // 5 minutes ago
    severity: "high",
    message: "Payment processing system not responding to health checks"
  },
  {
    id: 2,
    system_name: "Card Reader - Dining Hall West",
    status: "degraded",
    last_seen: new Date(Date.now() - 120000), // 2 minutes ago
    severity: "medium",
    message: "Intermittent connection issues reported"
  },
  {
    id: 3,
    system_name: "Balance Sync Service",
    status: "unresponsive",
    last_seen: new Date(Date.now() - 900000), // 15 minutes ago
    severity: "critical",
    message: "Account balance synchronization service offline"
  }
];

// Mock metrics
export const mockMetrics = {
  totalTransactions: 12847,
  totalVolume: 85923.45,
  activeUsers: 2341,
  systemsOnline: 27,
  systemsTotal: 30,
  avgTransactionValue: 6.89
};

// Function to simulate live data updates
export const getUpdatedMetrics = () => {
  return {
    ...mockMetrics,
    totalTransactions: mockMetrics.totalTransactions + Math.floor(Math.random() * 10),
    totalVolume: Math.round((mockMetrics.totalVolume + Math.random() * 100) * 100) / 100,
    activeUsers: mockMetrics.activeUsers + Math.floor(Math.random() * 20) - 10,
    avgTransactionValue: Math.round((5 + Math.random() * 4) * 100) / 100
  };
};

// Function to add new transaction (simulate real-time)
let transactionIdCounter = Date.now(); // Start with current timestamp

export const generateNewTransaction = () => {
  const balanceType = balanceTypes[Math.floor(Math.random() * balanceTypes.length)];
  let amount, remaining;
  
  if (balanceType === "Meal Swipe") {
    amount = -1;
    remaining = Math.floor(Math.random() * 200) + 50;
  } else {
    amount = -(Math.random() * 25 + 3);
    remaining = Math.random() * 500 + 50;
  }
  
  // Increment counter to ensure unique IDs even when called multiple times in same millisecond
  transactionIdCounter++;
  
  return {
    id: transactionIdCounter, // Use incrementing counter for unique ID
    timestamp: new Date(),
    location: locations[Math.floor(Math.random() * locations.length)],
    item: items[Math.floor(Math.random() * items.length)],
    balance_type: balanceType,
    amount: Math.round(amount * 100) / 100,
    remaining_balance: Math.round(remaining * 100) / 100,
    student_id: `SU2024${String(Math.floor(Math.random() * 9999) + 1).padStart(4, '0')}`,
    student_name: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`
  };
};
