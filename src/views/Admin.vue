<template>
	<v-container fluid class="pa-4 pa-md-6">
		
		<!-- KEY METRICS CARDS -->
		<v-row class="mb-4 mb-md-6">
			<v-col cols="6" sm="6" md="3" xl="3">
				<div class="std-glass-card metric-glass-card" @mouseenter="handleCardHover" @mouseleave="handleCardLeave">
					<div class="std-glass-content">
						<div class="std-glass-icon-container">
							<v-icon icon="mdi-cash-multiple" size="48" class="std-glass-icon"></v-icon>
							<div class="std-specular-highlight"></div>
						</div>
						<h3 class="std-glass-title">${{ metrics.totalVolume.toLocaleString() }}</h3>
						<p class="std-glass-subtitle">Total Volume Today</p>
						<div class="std-glass-border-glow"></div>
					</div>
				</div>
			</v-col>
			<v-col cols="6" sm="6" md="3" xl="3">
				<div class="std-glass-card metric-glass-card" @mouseenter="handleCardHover" @mouseleave="handleCardLeave">
					<div class="std-glass-content">
						<div class="std-glass-icon-container">
							<v-icon icon="mdi-credit-card" size="48" class="std-glass-icon"></v-icon>
							<div class="std-specular-highlight"></div>
						</div>
						<h3 class="std-glass-title">{{ metrics.totalTransactions.toLocaleString() }}</h3>
						<p class="std-glass-subtitle">Transactions Today</p>
						<div class="std-glass-border-glow"></div>
					</div>
				</div>
			</v-col>
			<v-col cols="6" sm="6" md="3" xl="3">
				<div class="std-glass-card metric-glass-card" @mouseenter="handleCardHover" @mouseleave="handleCardLeave">
					<div class="std-glass-content">
						<div class="std-glass-icon-container">
							<v-icon icon="mdi-account-group" size="48" class="std-glass-icon"></v-icon>
							<div class="std-specular-highlight"></div>
						</div>
						<h3 class="std-glass-title">{{ metrics.activeUsers.toLocaleString() }}</h3>
						<p class="std-glass-subtitle">Active Users</p>
						<div class="std-glass-border-glow"></div>
					</div>
				</div>
			</v-col>
			<v-col cols="6" sm="6" md="3" xl="3">
				<div class="std-glass-card metric-glass-card" @mouseenter="handleCardHover" @mouseleave="handleCardLeave">
					<div class="std-glass-content">
						<div class="std-glass-icon-container">
							<v-icon icon="mdi-server-network" size="48" class="std-glass-icon"></v-icon>
							<div class="std-specular-highlight"></div>
						</div>
						<h3 class="std-glass-title">{{ metrics.systemsOnline }}/{{ metrics.systemsTotal }}</h3>
						<p class="std-glass-subtitle">Systems Online</p>
						<div class="std-glass-border-glow"></div>
					</div>
				</div>
			</v-col>
		</v-row>

		<!-- CHARTS SECTION -->
		<v-row class="mb-4 mb-md-6">
			<v-col cols="12" lg="6" xl="6">
				<div class="std-glass-panel chart-glass-panel">
					<div class="std-glass-content">
						<div class="panel-header">
							<div class="std-glass-icon-container small">
								<v-icon icon="mdi-chart-line" size="32" class="std-glass-icon"></v-icon>
								<div class="std-specular-highlight"></div>
							</div>
							<div class="panel-title">
								<h4>Transaction Analytics</h4>
								<span class="status-indicator optimal">Live</span>
							</div>
						</div>
						<div class="chart-container">
							<apexchart
								type="line"
								:height="chartHeight"
								:options="transactionChartOptions"
								:series="transactionChartSeries"
							></apexchart>
						</div>
						<div class="std-glass-border-glow"></div>
					</div>
				</div>
			</v-col>
			<v-col cols="12" lg="6" xl="6">
				<div class="std-glass-panel chart-glass-panel">
					<div class="std-glass-content">
						<div class="panel-header">
							<div class="std-glass-icon-container small">
								<v-icon icon="mdi-currency-usd" size="32" class="std-glass-icon"></v-icon>
								<div class="std-specular-highlight"></div>
							</div>
							<div class="panel-title">
								<h4>Dollar Volume</h4>
								<span class="status-indicator optimal">Live</span>
							</div>
						</div>
						<div class="chart-container">
							<apexchart
								type="area"
								:height="chartHeight"
								:options="dollarChartOptions"
								:series="dollarChartSeries"
							></apexchart>
						</div>
						<div class="std-glass-border-glow"></div>
					</div>
				</div>
			</v-col>
		</v-row>

		<!-- MAIN CONTENT ROW -->
		<v-row>
			<!-- TRANSACTIONS TABLE -->
			<v-col cols="12" lg="8">
				<div class="std-glass-panel transactions-glass-panel">
					<div class="std-glass-content">
						<div class="panel-header">
							<div class="std-glass-icon-container small">
								<v-icon icon="mdi-format-list-bulleted" size="32" class="std-glass-icon"></v-icon>
								<div class="std-specular-highlight"></div>
							</div>
							<div class="panel-title">
								<h4>Recent Transactions</h4>
								<span class="status-indicator secure">Live Updates</span>
							</div>
						</div>
						
						<!-- SEARCH BAR -->
						<div class="glass-search-container">
							<v-text-field
								v-model="search"
								prepend-inner-icon="mdi-magnify"
								label="Search transactions..."
								variant="outlined"
								density="compact"
								class="glass-search-field"
								hide-details
								clearable
							></v-text-field>
						</div>

						<div class="glass-table-container">
							<v-data-table
								:headers="transactionHeaders"
								:items="filteredTransactions"
								:search="search"
								:items-per-page="itemsPerPage"
								class="glass-data-table"
								density="compact"
							>
								<template v-slot:item.timestamp="{ item }">
									<span class="glass-table-text">{{ formatDateTime(item.timestamp) }}</span>
								</template>
								<template v-slot:item.amount="{ item }">
									<span class="glass-table-text amount-text">
										${{ Math.abs(item.amount).toFixed(2) }}
									</span>
								</template>
								<template v-slot:item.balance_type="{ item }">
									<div class="glass-chip tonal-balance-chip" :class="getBalanceTypeClass(item.balance_type)">
										{{ item.balance_type }}
									</div>
								</template>
								<template v-slot:item.remaining_balance="{ item }">
									<span class="glass-table-text balance-text">
										${{ parseFloat(item.remaining_balance || 0).toFixed(2) }}
									</span>
								</template>
							</v-data-table>
						</div>
						<div class="std-glass-border-glow"></div>
					</div>
				</div>
			</v-col>

			<!-- RIGHT SIDEBAR -->
			<v-col cols="12" lg="4">
				<!-- SYSTEM ALERTS -->
				<div class="std-glass-panel alerts-glass-panel mb-4">
					<div class="std-glass-content">
						<div class="panel-header">
							<div class="std-glass-icon-container small">
								<v-icon icon="mdi-alert-circle" size="32" class="std-glass-icon alert-icon"></v-icon>
								<div class="std-specular-highlight"></div>
							</div>
							<div class="panel-title">
								<h4>System Alerts</h4>
								<span class="status-indicator critical">{{ alerts.length }}</span>
							</div>
						</div>
						<div class="alerts-container">
							<div v-for="alert in alerts" :key="alert.id" class="glass-alert-item">
								<div class="alert-severity-indicator" :class="alert.severity"></div>
								<div class="alert-content">
									<div class="alert-system">{{ alert.system_name }}</div>
									<div class="alert-message">{{ alert.message }}</div>
									<div class="alert-time">{{ formatTimeAgo(alert.last_seen) }}</div>
								</div>
								<div class="alert-pulse-dot"></div>
							</div>
						</div>
						<div class="std-glass-border-glow"></div>
					</div>
				</div>

				<!-- QUICK ACTIONS -->
				<div class="std-glass-panel actions-glass-panel">
					<div class="std-glass-content">
						<div class="panel-header">
							<div class="std-glass-icon-container small">
								<v-icon icon="mdi-lightning-bolt" size="32" class="std-glass-icon"></v-icon>
								<div class="std-specular-highlight"></div>
							</div>
							<div class="panel-title">
								<h4>Quick Actions</h4>
								<span class="status-indicator optimal">Ready</span>
							</div>
						</div>
						<div class="actions-container">
							<div class="glass-action-btn" @click="showActionDialog('deactivate')" @mouseenter="handleActionHover" @mouseleave="handleActionLeave">
								<div class="action-icon">
									<v-icon icon="mdi-account-off" size="24"></v-icon>
								</div>
								<span class="action-text">Deactivate Account</span>
								<div class="action-ripple"></div>
							</div>
							<div class="glass-action-btn" @click="showActionDialog('addFunds')" @mouseenter="handleActionHover" @mouseleave="handleActionLeave">
								<div class="action-icon">
									<v-icon icon="mdi-cash-plus" size="24"></v-icon>
								</div>
								<span class="action-text">Add Funds</span>
								<div class="action-ripple"></div>
							</div>
							<div class="glass-action-btn" @click="showActionDialog('generateReport')" @mouseenter="handleActionHover" @mouseleave="handleActionLeave">
								<div class="action-icon">
									<v-icon icon="mdi-file-chart" size="24"></v-icon>
								</div>
								<span class="action-text">Generate Report</span>
								<div class="action-ripple"></div>
							</div>
						</div>
						<div class="std-glass-border-glow"></div>
					</div>
				</div>
			</v-col>
		</v-row>

		<!-- ACTION DIALOG -->
		<v-dialog v-model="actionDialog" max-width="500">
			<div class="std-glass-panel dialog-glass-panel">
				<div class="std-glass-content">
					<div class="dialog-header">
						<h3 class="std-glass-title">{{ actionDialogTitle }}</h3>
					</div>
					<div class="dialog-message">
						{{ actionDialogMessage }}
					</div>
					<div class="dialog-actions">
						<div class="glass-action-btn cancel-btn" @click="actionDialog = false">
							<span class="action-text">Cancel</span>
						</div>
						<div class="glass-action-btn confirm-btn" @click="executeAction">
							<span class="action-text">Confirm</span>
						</div>
					</div>
					<div class="std-glass-border-glow"></div>
				</div>
			</div>
		</v-dialog>

	</v-container>
</template>

<script setup>
	import { api, ui, theme } from '@/stores'
	import { ref, computed, onMounted, onUnmounted } from 'vue'
	import VueApexCharts from 'vue3-apexcharts'
	import { 
		generateMockTransactions, 
		generateChartData, 
		mockAlerts, 
		getUpdatedMetrics,
		generateNewTransaction
	} from '@/stores/mockData.js'

	// Register ApexCharts component
	const apexchart = VueApexCharts
</script>

<script>
export default {
	components: {
		apexchart: VueApexCharts
	},
	
	data: () => ({
		// Data
		transactions: [],
		chartData: [],
		alerts: [],
		metrics: {
			totalVolume: 0,
			totalTransactions: 0,
			activeUsers: 0,
			systemsOnline: 0,
			systemsTotal: 0
		},
		search: '',
		
		// Dialog
		actionDialog: false,
		currentAction: null,
		
		// Update interval
		updateInterval: null,
		
		// New transactions this period (for chart calculation)
		newTransactionsThisPeriod: [],
		
		// Table headers
		transactionHeaders: [
			{ title: 'Time', key: 'timestamp', width: '140px' },
			{ title: 'Student', key: 'student_name', width: '140px' },
			{ title: 'Location', key: 'location' },
			{ title: 'Item', key: 'item' },
			{ title: 'Type', key: 'balance_type', width: '110px' },
			{ title: 'Amount', key: 'amount', width: '100px' },
			{ title: 'Remaining', key: 'remaining_balance', width: '110px' }
		]
	}),

	async mounted() {
		this.loadInitialData()
		this.startLiveUpdates()
	},

	beforeUnmount() {
		if (this.updateInterval) {
			clearInterval(this.updateInterval)
		}
	},

	computed: {
		filteredTransactions() {
			return this.transactions
		},
		
		// Responsive properties
		chartHeight() {
			return this.$vuetify.display.mobile ? 250 : this.$vuetify.display.mdAndUp ? 300 : 280
		},
		
		itemsPerPage() {
			return this.$vuetify.display.mobile ? 10 : 10
		},
		
		buttonSize() {
			return this.$vuetify.display.mobile ? 'default' : 'large'
		},
		
		transactionChartOptions() {
			return {
				chart: {
					type: 'line',
					height: this.chartHeight,
					animations: {
						enabled: true,
						easing: 'easeinout',
						speed: 300,
						animateGradually: {
							enabled: false
						},
						dynamicAnimation: {
							enabled: false
						}
					},
					toolbar: { show: false },
					background: 'transparent'
				},
				colors: [theme.getColor('primary') || '#2E5984'],
				stroke: {
					curve: 'smooth',
					width: 3
				},
				xaxis: {
					type: 'datetime',
					labels: {
						format: 'HH:mm',
						style: { colors: theme.getColor('primary') || '#2E5984' }
					}
				},
				yaxis: {
					title: { 
						text: 'Transactions per 5s',
						style: { color: theme.getColor('primary') || '#2E5984' }
					},
					labels: {
						style: { colors: theme.getColor('primary') || '#2E5984' }
					}
				},
				grid: {
					borderColor: theme.getColor('primary') + '30' || '#2E598430'
				},
				tooltip: {
					x: { format: 'HH:mm' }
				}
			}
		},
		
		transactionChartSeries() {
			return [{
				name: 'Transactions',
				data: this.chartData.map(d => ({
					x: d.timestamp.getTime(),
					y: d.transactionCount
				}))
			}]
		},
		
		dollarChartOptions() {
			return {
				chart: {
					type: 'area',
					height: this.chartHeight,
					animations: {
						enabled: true,
						easing: 'easeinout',
						speed: 300,
						animateGradually: {
							enabled: false
						},
						dynamicAnimation: {
							enabled: false
						}
					},
					toolbar: { show: false },
					background: 'transparent'
				},
				colors: [theme.getColor('success') || '#4CAF50'],
				fill: {
					type: 'gradient',
					gradient: {
						shadeIntensity: 1,
						opacityFrom: 0.7,
						opacityTo: 0.1
					}
				},
				stroke: {
					curve: 'smooth',
					width: 2
				},
				xaxis: {
					type: 'datetime',
					labels: {
						format: 'HH:mm',
						style: { colors: theme.getColor('primary') || '#2E5984' }
					}
				},
				yaxis: {
					title: { 
						text: 'Dollar Volume per 5s',
						style: { color: theme.getColor('primary') || '#2E5984' }
					},
					labels: {
						formatter: function (val) {
							return '$' + val.toFixed(0)
						},
						style: { colors: theme.getColor('primary') || '#2E5984' }
					}
				},
				grid: {
					borderColor: theme.getColor('primary') + '30' || '#2E598430'
				},
				tooltip: {
					x: { format: 'HH:mm' },
					y: {
						formatter: function (val) {
							return '$' + val.toFixed(2)
						}
					}
				}
			}
		},
		
		dollarChartSeries() {
			return [{
				name: 'Dollar Volume',
				data: this.chartData.map(d => ({
					x: d.timestamp.getTime(),
					y: d.dollarAmount
				}))
			}]
		},
		
		actionDialogTitle() {
			const titles = {
				deactivate: 'Deactivate Account',
				addFunds: 'Add Funds',
				generateReport: 'Generate Report'
			}
			return titles[this.currentAction] || ''
		},
		
		actionDialogMessage() {
			const messages = {
				deactivate: 'Are you sure you want to deactivate this account? This action will prevent all card transactions.',
				addFunds: 'Add funds to a student account. This will open the fund management interface.',
				generateReport: 'Generate a comprehensive transaction report for the selected time period.'
			}
			return messages[this.currentAction] || ''
		}
	},

	methods: {
		loadInitialData() {
			this.transactions = generateMockTransactions(100)
			this.chartData = generateChartData()
			this.alerts = [...mockAlerts]
			this.metrics = getUpdatedMetrics()
			this.newTransactionsThisPeriod = []
		},
		
		startLiveUpdates() {
			this.updateInterval = setInterval(() => {
				this.updateLiveData()
			}, 5000) // 5 second refresh
		},
		
		updateLiveData() {
			// Update metrics
			this.metrics = getUpdatedMetrics()
			
			// Generate new transactions (can be multiple)
			const newTransactions = []
			const numNewTransactions = Math.floor(Math.random() * 4) // 0-3 transactions per update
			
			for (let i = 0; i < numNewTransactions; i++) {
				const newTransaction = generateNewTransaction()
				newTransactions.push(newTransaction)
				this.transactions.unshift(newTransaction)
			}
			
			// Keep only last 100 transactions in table
			if (this.transactions.length > 100) {
				this.transactions = this.transactions.slice(0, 100)
			}
			
			// Add new transactions to current period tracking
			this.newTransactionsThisPeriod.push(...newTransactions)
			
			// Calculate real chart data point based on actual transactions
			const now = new Date()
			const transactionCount = this.newTransactionsThisPeriod.length
			const dollarAmount = this.newTransactionsThisPeriod.reduce((sum, transaction) => {
				return sum + Math.abs(transaction.amount)
			}, 0)
			
			const newDataPoint = {
				timestamp: now,
				transactionCount: transactionCount,
				dollarAmount: Math.round(dollarAmount * 100) / 100
			}
			
			this.chartData.push(newDataPoint)
			
			// Reset the period counter for next update
			this.newTransactionsThisPeriod = []
			
			// Keep only last 30 minutes of chart data
			this.chartData = this.chartData.slice(-30)
		},
		
		getBalanceTypeColor(type) {
			const colors = {
				'Dining Cash': 'success',
				'Flex Plan': 'info', 
				'Meal Swipe': 'warning'
			}
			return colors[type] || 'primary'
		},
		
		getBalanceTypeClass(type) {
			const classes = {
				'Dining Cash': 'dining-cash',
				'Flex Plan': 'flex-plan', 
				'Meal Swipe': 'meal-swipe'
			}
			return classes[type] || 'default-type'
		},
		
		handleCardHover(event) {
			const card = event.currentTarget
			card.classList.add('card-hovered')
		},

		handleCardLeave(event) {
			const card = event.currentTarget
			card.classList.remove('card-hovered')
		},

		handleActionHover(event) {
			const btn = event.currentTarget
			btn.classList.add('action-hovered')
		},

		handleActionLeave(event) {
			const btn = event.currentTarget
			btn.classList.remove('action-hovered')
		},

		formatDateTime(date) {
			return new Intl.DateTimeFormat('en-US', {
				month: 'short',
				day: 'numeric',
				hour: '2-digit',
				minute: '2-digit'
			}).format(date)
		},
		
		formatTimeAgo(date) {
			const now = new Date()
			const diff = now - date
			const minutes = Math.floor(diff / 60000)
			
			if (minutes < 1) return 'Just now'
			if (minutes === 1) return '1 minute ago'
			if (minutes < 60) return `${minutes} minutes ago`
			
			const hours = Math.floor(minutes / 60)
			if (hours === 1) return '1 hour ago'
			if (hours < 24) return `${hours} hours ago`
			
			const days = Math.floor(hours / 24)
			return `${days} day${days > 1 ? 's' : ''} ago`
		},
		
		showActionDialog(action) {
			this.currentAction = action
			this.actionDialog = true
		},
		
		executeAction() {
			// Simulate action execution
			ui.snackText = `${this.actionDialogTitle} executed successfully`
			ui.snackColor = 'success'
			ui.snack = true
			
			this.actionDialog = false
			this.currentAction = null
		}
	}
}
</script>

<style scoped>
/* ADMIN DASHBOARD STYLES - Using std-glass classes */

/* Metric Cards - Custom styling for dashboard metrics */
.metric-glass-card {
	height: 200px !important;
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
}

.metric-glass-card .std-glass-content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 24px;
	height: 100%;
	width: 100%;
	text-align: center;
}

.std-glass-content {
	display: flex;
	flex-direction: column;
	padding: 24px;
	height: 100%;
	width: 100%;
}

.std-glass-icon-container {
	width: 80px;
	height: 80px;
	border-radius: 20px;
	margin-bottom: 16px;
}

.std-glass-icon-container.small {
	width: 56px;
	height: 56px;
	border-radius: 16px;
	margin-bottom: 0;
	margin-right: 0;
}

.std-glass-icon {
	color: rgba(255, 255, 255, 0.9) !important;
	transition: all var(--std-transition-normal) var(--std-ease-out);
}

.std-glass-title {
	color: rgba(255, 255, 255, 0.95) !important;
	font-size: 2rem !important;
	font-weight: 700 !important;
	margin-bottom: 8px !important;
	text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.std-glass-subtitle {
	color: rgba(255, 255, 255, 0.8) !important;
	font-size: 0.9rem;
	font-weight: 500;
	margin: 0;
	text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

/* Chart Panels */
.chart-glass-panel {
	min-height: 350px;
}

.chart-container {
	flex: 1;
	margin-top: 16px;
}

/* Transactions Panel */
.transactions-glass-panel {
	min-height: 600px;
}

/* Alerts Panel */
.alerts-glass-panel {
	min-height: 300px;
}

/* Actions Panel */
.actions-glass-panel {
	min-height: 250px;
}

/* Panel Headers */
.panel-header {
	display: flex;
	align-items: center;
	gap: 16px;
	margin-bottom: 16px;
}

.panel-title h4 {
	color: rgba(255, 255, 255, 0.95);
	margin: 0 0 4px 0;
	font-size: 1.2rem;
	font-weight: 600;
}

/* Search Field */
.glass-search-container {
	margin: 20px 0;
}

.glass-search-field {
	background: rgba(255, 255, 255, 0.1) !important;
	border-radius: 16px !important;
}

.glass-search-field :deep(.v-field) {
	background: rgba(255, 255, 255, 0.1) !important;
	border-radius: 16px !important;
	border: 1px solid rgba(255, 255, 255, 0.2) !important;
	backdrop-filter: blur(10px);
	-webkit-backdrop-filter: blur(10px);
}

.glass-search-field :deep(.v-field__input) {
	color: white !important;
}

.glass-search-field :deep(.v-field__outline) {
	display: none;
}

/* Data Table */
.glass-table-container {
	flex: 1;
	border-radius: 20px;
	overflow: hidden;
	background: rgba(255, 255, 255, 0.05);
	border: 1px solid rgba(255, 255, 255, 0.1);
	backdrop-filter: blur(10px);
	-webkit-backdrop-filter: blur(10px);
}

.glass-data-table {
	background: transparent !important;
}

.glass-data-table :deep(.v-data-table__wrapper) {
	background: transparent !important;
}

.glass-data-table :deep(.v-data-table-header) {
	background: linear-gradient(135deg, 
		rgba(255, 255, 255, 0.2) 0%, 
		rgba(255, 255, 255, 0.1) 100%) !important;
}

.glass-data-table :deep(.v-data-table-header th) {
	color: white !important;
	font-weight: 600 !important;
	border-bottom: 1px solid rgba(255, 255, 255, 0.2) !important;
}

.glass-data-table :deep(.v-data-table__tr) {
	background: transparent !important;
	transition: all var(--std-transition-normal) var(--std-ease-out) !important;
}

.glass-data-table :deep(.v-data-table__tr:hover) {
	background: linear-gradient(90deg, 
		rgba(135, 206, 235, 0.15) 0%, 
		rgba(255, 255, 255, 0.1) 50%, 
		rgba(135, 206, 235, 0.15) 100%) !important;
	transform: translateX(4px) !important;
}

.glass-data-table :deep(.v-data-table__td) {
	border-bottom: 1px solid rgba(255, 255, 255, 0.05) !important;
	color: white !important;
	padding: 12px 16px !important;
}

.glass-table-text {
	color: rgba(255, 255, 255, 0.9);
	font-weight: 500;
}

.balance-text {
	color: rgba(255, 255, 255, 0.95) !important;
	font-weight: 600 !important;
}

.amount-text {
	color: rgba(255, 255, 255, 0.95) !important;
	font-weight: 600 !important;
	font-size: 0.9rem !important;
}

/* Balance Type Chips */
.glass-chip {
	padding: 6px 12px;
	border-radius: 20px;
	font-weight: 600;
	font-size: 0.8rem;
	color: white;
	text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
	backdrop-filter: blur(10px);
	-webkit-backdrop-filter: blur(10px);
	border: 1px solid rgba(255, 255, 255, 0.2);
	display: inline-block;
	vertical-align: middle;
}

.tonal-balance-chip.dining-cash {
	background: linear-gradient(135deg, 
		rgba(255, 255, 255, 0.15) 0%, 
		rgba(255, 255, 255, 0.08) 100%);
	border: 1px solid rgba(255, 255, 255, 0.25);
	max-width: 100px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.tonal-balance-chip.flex-plan {
	background: linear-gradient(135deg, 
		rgba(255, 255, 255, 0.12) 0%, 
		rgba(255, 255, 255, 0.06) 100%);
	border: 1px solid rgba(255, 255, 255, 0.2);
	max-width: 100px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.tonal-balance-chip.meal-swipe {
	background: linear-gradient(135deg, 
		rgba(255, 255, 255, 0.18) 0%, 
		rgba(255, 255, 255, 0.1) 100%);
	border: 1px solid rgba(255, 255, 255, 0.3);
	max-width: 100px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

/* Alert Items */
.alerts-container {
	flex: 1;
	margin-top: 16px;
}

.glass-alert-item {
	display: flex;
	align-items: flex-start;
	gap: 12px;
	padding: 16px;
	margin-bottom: 12px;
	border-radius: 16px;
	background: rgba(255, 255, 255, 0.05);
	border: 1px solid rgba(255, 255, 255, 0.1);
	transition: all var(--std-transition-normal) var(--std-ease-out);
}

.glass-alert-item:hover {
	background: rgba(255, 255, 255, 0.1);
	transform: translateY(-2px);
}

.alert-severity-indicator {
	width: 12px;
	height: 12px;
	border-radius: 50%;
	margin-top: 4px;
}

.alert-severity-indicator.critical {
	background: #F44336;
	animation: criticalPulse 2s ease-in-out infinite;
}

.alert-severity-indicator.high {
	background: #FF9800;
	animation: highPulse 3s ease-in-out infinite;
}

.alert-severity-indicator.medium {
	background: #2196F3;
}

@keyframes criticalPulse {
	0%, 100% { opacity: 1; transform: scale(1); }
	50% { opacity: 0.6; transform: scale(1.2); }
}

@keyframes highPulse {
	0%, 100% { opacity: 1; transform: scale(1); }
	50% { opacity: 0.7; transform: scale(1.1); }
}

.alert-content {
	flex: 1;
}

.alert-system {
	color: rgba(255, 255, 255, 0.95);
	font-weight: 600;
	font-size: 0.9rem;
	margin-bottom: 4px;
}

.alert-message {
	color: rgba(255, 255, 255, 0.8);
	font-size: 0.8rem;
	line-height: 1.4;
	margin-bottom: 4px;
}

.alert-time {
	color: rgba(255, 255, 255, 0.6);
	font-size: 0.75rem;
}

.alert-pulse-dot {
	width: 6px;
	height: 6px;
	border-radius: 50%;
	background: rgba(255, 255, 255, 0.6);
	animation: alertPulse 2s ease-in-out infinite;
}

@keyframes alertPulse {
	0%, 100% { opacity: 0.6; transform: scale(1); }
	50% { opacity: 1; transform: scale(1.3); }
}

/* Action Buttons */
.actions-container {
	flex: 1;
	margin-top: 16px;
}

.glass-action-btn {
	display: flex;
	align-items: center;
	gap: 12px;
	padding: 16px 20px;
	margin-bottom: 12px;
	border-radius: 20px;
	background: linear-gradient(135deg, 
		rgba(255, 255, 255, 0.1) 0%, 
		rgba(255, 255, 255, 0.05) 100%);
	border: 1px solid rgba(255, 255, 255, 0.2);
	cursor: pointer;
	transition: all var(--std-transition-slow) var(--std-ease-out);
	position: relative;
	overflow: hidden;
}

.glass-action-btn:hover,
.glass-action-btn.action-hovered {
	background: linear-gradient(135deg, 
		rgba(255, 255, 255, 0.2) 0%, 
		rgba(255, 255, 255, 0.1) 100%);
	transform: translateY(-2px) scale(1.02);
}

.action-icon {
	width: 40px;
	height: 40px;
	border-radius: 12px;
	background: linear-gradient(135deg, 
		var(--theme-primary, #2E5984), 
		var(--theme-accent, #87CEEB));
	display: flex;
	align-items: center;
	justify-content: center;
	color: white;
}

.action-text {
	color: rgba(255, 255, 255, 0.95);
	font-weight: 600;
	font-size: 0.9rem;
	flex: 1;
}

.action-ripple {
	position: absolute;
	top: 50%;
	left: 50%;
	width: 0;
	height: 0;
	border-radius: 50%;
	background: radial-gradient(circle, 
		rgba(255, 255, 255, 0.3) 0%, 
		transparent 70%);
	pointer-events: none;
	transition: all 0.6s ease-out;
	transform: translate(-50%, -50%);
}

.glass-action-btn:active .action-ripple {
	width: 200px;
	height: 200px;
}

/* Dialog */
.dialog-glass-panel {
	min-width: 400px;
	margin: 20px;
}

.dialog-header {
	text-align: center;
	margin-bottom: 20px;
}

.dialog-message {
	color: rgba(255, 255, 255, 0.8);
	font-size: 1rem;
	line-height: 1.5;
	text-align: center;
	margin-bottom: 30px;
}

.dialog-actions {
	display: flex;
	gap: 16px;
	justify-content: center;
}

.dialog-actions .glass-action-btn {
	flex: 1;
	justify-content: center;
	margin-bottom: 0;
}

.cancel-btn {
	background: linear-gradient(135deg, 
		rgba(244, 67, 54, 0.2) 0%, 
		rgba(244, 67, 54, 0.1) 100%);
}

.confirm-btn {
	background: linear-gradient(135deg, 
		rgba(76, 175, 80, 0.2) 0%, 
		rgba(76, 175, 80, 0.1) 100%);
}

/* Status Indicators */
.status-indicator {
	padding: 4px 8px;
	border-radius: 12px;
	font-size: 0.75rem;
	font-weight: 600;
	color: white;
	text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
	backdrop-filter: blur(10px);
	-webkit-backdrop-filter: blur(10px);
}

.status-indicator.optimal {
	background: rgba(76, 175, 80, 0.3);
	border: 1px solid rgba(76, 175, 80, 0.4);
}

.status-indicator.secure {
	background: rgba(33, 150, 243, 0.3);
	border: 1px solid rgba(33, 150, 243, 0.4);
}

.status-indicator.critical {
	background: rgba(244, 67, 54, 0.3);
	border: 1px solid rgba(244, 67, 54, 0.4);
	animation: criticalBlink 2s ease-in-out infinite;
}

@keyframes criticalBlink {
	0%, 100% { opacity: 1; }
	50% { opacity: 0.7; }
}

/* Alert Icon */
.alert-icon {
	color: rgba(244, 67, 54, 0.9) !important;
	filter: drop-shadow(0 0 8px rgba(244, 67, 54, 0.5));
}

/* Card Hover Effects */
.metric-glass-card.card-hovered {
	transform: translateY(-8px) scale(1.03);
	box-shadow: 
		0 16px 40px rgba(135, 206, 235, 0.25),
		0 8px 20px rgba(0, 0, 0, 0.3);
	transition: all var(--std-transition-slow) var(--std-ease-out);
}

.metric-glass-card.card-hovered .std-glass-title {
	text-shadow: 
		0 0 30px rgba(255, 255, 255, 0.6),
		0 2px 4px rgba(0, 0, 0, 0.3);
	transform: scale(1.05);
	transition: all var(--std-transition-normal) ease;
}

.metric-glass-card.card-hovered .std-glass-icon {
	transform: translateY(-2px) scale(1.1);
	filter: drop-shadow(0 0 15px rgba(135, 206, 235, 0.6));
	transition: all var(--std-transition-normal) ease;
}

.metric-glass-card.card-hovered .std-glass-subtitle {
	color: rgba(255, 255, 255, 0.95);
	text-shadow: 0 0 15px rgba(255, 255, 255, 0.4);
	transition: all var(--std-transition-normal) ease;
}

/* Responsive Design */
@media (max-width: 768px) {
	.metric-glass-card {
		height: 160px !important;
	}
	
	.std-glass-title {
		font-size: 1.5rem !important;
	}
	
	.chart-glass-panel {
		min-height: 280px;
	}
	
	.transactions-glass-panel {
		min-height: 500px;
	}
	
	.dialog-glass-panel {
		min-width: 300px;
		margin: 10px;
	}
}
</style>

