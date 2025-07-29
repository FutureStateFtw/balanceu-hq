<template>
	<v-container fluid class="pa-6">
		
		<!-- Header Section with User Profile -->
		<v-row class="mb-6">
			<v-col cols="12">
				<v-card color="primary" class="user-header-card" elevation="6">
					<v-card-text class="pa-6">
						<v-row align="center">
							<v-col cols="auto">
								<v-avatar size="80" color="accent" class="text-h4 font-weight-bold">
									{{ userInitials }}
								</v-avatar>
							</v-col>
							<v-col>
								<h1 class="text-h3 font-weight-light text-white mb-1">{{ currentUser.name }}</h1>
								<p class="text-h6 text-white opacity-80 mb-2">{{ currentUser.role }}</p>
								<v-chip color="success" size="small" class="mr-2">
									<v-icon icon="mdi-check-circle" size="small" class="mr-1"></v-icon>
									Active Session
								</v-chip>
								<v-chip color="info" size="small">
									Last Login: {{ formatTime(currentUser.lastLogin) }}
								</v-chip>
							</v-col>
							<v-col cols="auto" class="text-right">
								<div class="text-white">
									<div class="text-h6 font-weight-medium">{{ formatTime(new Date()) }}</div>
									<div class="text-body-2 opacity-80">{{ formatDate(new Date()) }}</div>
								</div>
							</v-col>
						</v-row>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>

		<!-- Key Metrics Cards -->
		<v-row class="mb-6">
			<v-col cols="12" sm="6" md="3">
				<v-card color="success" class="metric-card" elevation="4">
					<v-card-text class="pa-4 text-center">
						<v-icon icon="mdi-cash-multiple" size="x-large" color="white" class="mb-2"></v-icon>
						<div class="text-h4 font-weight-bold text-white">${{ metrics.totalVolume.toLocaleString() }}</div>
						<div class="text-body-2 text-white opacity-80">Total Volume Today</div>
					</v-card-text>
				</v-card>
			</v-col>
			<v-col cols="12" sm="6" md="3">
				<v-card color="info" class="metric-card" elevation="4">
					<v-card-text class="pa-4 text-center">
						<v-icon icon="mdi-credit-card" size="x-large" color="white" class="mb-2"></v-icon>
						<div class="text-h4 font-weight-bold text-white">{{ metrics.totalTransactions.toLocaleString() }}</div>
						<div class="text-body-2 text-white opacity-80">Transactions Today</div>
					</v-card-text>
				</v-card>
			</v-col>
			<v-col cols="12" sm="6" md="3">
				<v-card color="warning" class="metric-card" elevation="4">
					<v-card-text class="pa-4 text-center">
						<v-icon icon="mdi-account-group" size="x-large" color="white" class="mb-2"></v-icon>
						<div class="text-h4 font-weight-bold text-white">{{ metrics.activeUsers.toLocaleString() }}</div>
						<div class="text-body-2 text-white opacity-80">Active Users</div>
					</v-card-text>
				</v-card>
			</v-col>
			<v-col cols="12" sm="6" md="3">
				<v-card color="secondary" class="metric-card" elevation="4">
					<v-card-text class="pa-4 text-center">
						<v-icon icon="mdi-server-network" size="x-large" color="white" class="mb-2"></v-icon>
						<div class="text-h4 font-weight-bold text-white">{{ metrics.systemsOnline }}/{{ metrics.systemsTotal }}</div>
						<div class="text-body-2 text-white opacity-80">Systems Online</div>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>

		<!-- Charts Section -->
		<v-row class="mb-6">
			<v-col cols="12" md="6">
				<v-card color="accent" class="chart-card" elevation="4">
					<v-card-title class="text-primary font-weight-medium">
						<v-icon icon="mdi-chart-line" class="mr-2"></v-icon>
						Transaction Volume (Last 30 Minutes)
					</v-card-title>
					<v-card-text>
						<apexchart
							type="line"
							height="300"
							:options="transactionChartOptions"
							:series="transactionChartSeries"
						></apexchart>
					</v-card-text>
				</v-card>
			</v-col>
			<v-col cols="12" md="6">
				<v-card color="accent" class="chart-card" elevation="4">
					<v-card-title class="text-primary font-weight-medium">
						<v-icon icon="mdi-currency-usd" class="mr-2"></v-icon>
						Dollar Volume (Last 30 Minutes)
					</v-card-title>
					<v-card-text>
						<apexchart
							type="area"
							height="300"
							:options="dollarChartOptions"
							:series="dollarChartSeries"
						></apexchart>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>

		<!-- Main Content Row -->
		<v-row>
			<!-- Transactions Table -->
			<v-col cols="12" lg="8">
				<v-card color="secondary" class="transactions-card" elevation="6">
					<v-card-title class="text-white font-weight-medium d-flex align-center">
						<v-icon icon="mdi-format-list-bulleted" class="mr-2"></v-icon>
						Recent Transactions
						<v-spacer></v-spacer>
						<v-chip color="accent" size="small">
							Live Updates
						</v-chip>
					</v-card-title>
					
					<!-- Search Bar -->
					<v-card-text class="pb-0">
						<v-text-field
							v-model="search"
							prepend-inner-icon="mdi-magnify"
							label="Search transactions..."
							variant="outlined"
							density="compact"
							bg-color="white"
							hide-details
							clearable
						></v-text-field>
					</v-card-text>

					<v-card-text>
						<v-data-table
							:headers="transactionHeaders"
							:items="filteredTransactions"
							:search="search"
							:items-per-page="25"
							class="custom-table"
							density="compact"
						>
							<template v-slot:item.timestamp="{ item }">
								<span class="text-caption">{{ formatDateTime(item.timestamp) }}</span>
							</template>
							<template v-slot:item.amount="{ item }">
								<v-chip
									:color="item.amount < 0 ? 'error' : 'success'"
									size="small"
									variant="flat"
								>
									${{ Math.abs(item.amount).toFixed(2) }}
								</v-chip>
							</template>
							<template v-slot:item.balance_type="{ item }">
								<v-chip
									:color="getBalanceTypeColor(item.balance_type)"
									size="small"
									variant="outlined"
								>
									{{ item.balance_type }}
								</v-chip>
							</template>
							<template v-slot:item.remaining_balance="{ item }">
								<span class="font-weight-medium">
									{{ item.balance_type === 'Meal Swipe' ? item.remaining_balance : `$${item.remaining_balance.toFixed(2)}` }}
								</span>
							</template>
						</v-data-table>
					</v-card-text>
				</v-card>
			</v-col>

			<!-- Right Sidebar -->
			<v-col cols="12" lg="4">
				<!-- System Alerts -->
				<v-card color="error" class="mb-4 alerts-card" elevation="4">
					<v-card-title class="text-white font-weight-medium">
						<v-icon icon="mdi-alert-circle" class="mr-2"></v-icon>
						System Alerts
						<v-spacer></v-spacer>
						<v-chip color="white" text-color="error" size="small">
							{{ alerts.length }}
						</v-chip>
					</v-card-title>
					<v-card-text>
						<div v-for="alert in alerts" :key="alert.id" class="mb-3">
							<v-alert
								:type="alert.severity === 'critical' ? 'error' : alert.severity === 'high' ? 'warning' : 'info'"
								density="compact"
								class="mb-2"
							>
								<strong>{{ alert.system_name }}</strong><br>
								<small>{{ alert.message }}</small><br>
								<small>Last seen: {{ formatTimeAgo(alert.last_seen) }}</small>
							</v-alert>
						</div>
					</v-card-text>
				</v-card>

				<!-- Quick Actions -->
				<v-card color="info" class="actions-card" elevation="4">
					<v-card-title class="text-white font-weight-medium">
						<v-icon icon="mdi-lightning-bolt" class="mr-2"></v-icon>
						Quick Actions
					</v-card-title>
					<v-card-text>
						<v-btn 
							color="accent" 
							block 
							size="large" 
							class="mb-3"
							@click="showActionDialog('deactivate')"
						>
							<v-icon icon="mdi-account-off" class="mr-2"></v-icon>
							Deactivate Account
						</v-btn>
						<v-btn 
							color="accent" 
							block 
							size="large" 
							class="mb-3"
							@click="showActionDialog('addFunds')"
						>
							<v-icon icon="mdi-cash-plus" class="mr-2"></v-icon>
							Add Funds
						</v-btn>
						<v-btn 
							color="accent" 
							block 
							size="large"
							@click="showActionDialog('generateReport')"
						>
							<v-icon icon="mdi-file-chart" class="mr-2"></v-icon>
							Generate Report
						</v-btn>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>

		<!-- Action Dialog -->
		<v-dialog v-model="actionDialog" max-width="500">
			<v-card>
				<v-card-title>{{ actionDialogTitle }}</v-card-title>
				<v-card-text>{{ actionDialogMessage }}</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="grey" @click="actionDialog = false">Cancel</v-btn>
					<v-btn color="primary" @click="executeAction">Confirm</v-btn>
				</v-card-actions>
			</v-card>
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
		// User data
		currentUser: {
			name: 'David Davidson',
			role: 'Administrative User',
			lastLogin: new Date(Date.now() - 3600000) // 1 hour ago
		},
		
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
		
		// Table headers
		transactionHeaders: [
			{ title: 'Time', key: 'timestamp', width: '120px' },
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
		userInitials() {
			return this.currentUser.name
				.split(' ')
				.map(n => n[0])
				.join('')
				.toUpperCase()
		},
		
		filteredTransactions() {
			return this.transactions
		},
		
		transactionChartOptions() {
			return {
				chart: {
					type: 'line',
					height: 300,
					animations: {
						enabled: true,
						easing: 'linear',
						dynamicAnimation: {
							speed: 1000
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
						text: 'Transactions/min',
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
					height: 300,
					animations: {
						enabled: true,
						easing: 'linear',
						dynamicAnimation: {
							speed: 1000
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
						text: 'Dollar Volume',
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
		},
		
		startLiveUpdates() {
			this.updateInterval = setInterval(() => {
				this.updateLiveData()
			}, 5000) // 5 second refresh
		},
		
		updateLiveData() {
			// Update metrics
			this.metrics = getUpdatedMetrics()
			
			// Add new transaction occasionally
			if (Math.random() < 0.3) { // 30% chance every 5 seconds
				const newTransaction = generateNewTransaction()
				this.transactions.unshift(newTransaction)
				// Keep only last 100 transactions
				if (this.transactions.length > 100) {
					this.transactions = this.transactions.slice(0, 100)
				}
			}
			
			// Update chart data
			const now = new Date()
			const newDataPoint = {
				timestamp: now,
				transactionCount: Math.floor(Math.random() * 15) + 2,
				dollarAmount: Math.round((Math.random() * 200 + 50) * 100) / 100
			}
			
			this.chartData.push(newDataPoint)
			// Keep only last 30 minutes
			this.chartData = this.chartData.slice(-30)
		},
		
		getBalanceTypeColor(type) {
			const colors = {
				'Dining Cash': 'success',
				'Flex Plan': 'info',
				'Meal Swipe': 'warning'
			}
			return colors[type] || 'grey'
		},
		
		formatTime(date) {
			return new Intl.DateTimeFormat('en-US', {
				hour: '2-digit',
				minute: '2-digit',
				hour12: true
			}).format(date)
		},
		
		formatDate(date) {
			return new Intl.DateTimeFormat('en-US', {
				weekday: 'long',
				month: 'short',
				day: 'numeric'
			}).format(date)
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
.user-header-card {
	background: linear-gradient(135deg, var(--theme-primary, #2E5984) 0%, var(--theme-secondary, #4A90E2) 100%) !important;
	border-radius: 16px !important;
}

.metric-card {
	border-radius: 12px !important;
	transition: transform 0.3s ease, box-shadow 0.3s ease;
	cursor: pointer;
}

.metric-card:hover {
	transform: translateY(-4px);
	box-shadow: 0 12px 40px rgba(0,0,0,0.2) !important;
}

.chart-card {
	background: var(--theme-accent, #87CEEB) !important;
	border-radius: 12px !important;
}

.transactions-card {
	background: var(--theme-secondary, #4A90E2) !important;
	border-radius: 12px !important;
}

.alerts-card {
	background: var(--theme-error, #F44336) !important;
	border-radius: 12px !important;
}

.actions-card {
	background: var(--theme-info, #2196F3) !important;
	border-radius: 12px !important;
}

.custom-table {
	background: white !important;
	border-radius: 8px !important;
}

.custom-table :deep(.v-data-table__wrapper) {
	border-radius: 8px;
}

.custom-table :deep(.v-data-table-header) {
	background-color: var(--theme-primary, #2E5984) !important;
}

.custom-table :deep(.v-data-table-header th) {
	color: white !important;
	font-weight: 600 !important;
}

.custom-table :deep(.v-data-table__td) {
	border-bottom: 1px solid rgba(0,0,0,0.05) !important;
}

.custom-table :deep(.v-data-table__tr:hover) {
	background-color: var(--theme-accent, #87CEEB) !important;
	background-color: rgba(135, 206, 235, 0.1) !important;
}

.v-btn {
	text-transform: none !important;
	font-weight: 500 !important;
	letter-spacing: 0.5px !important;
}

.v-chip {
	font-weight: 500 !important;
}

.v-card {
	backdrop-filter: blur(10px);
	-webkit-backdrop-filter: blur(10px);
}

/* Animation for new rows */
@keyframes slideInFromTop {
	from {
		opacity: 0;
		transform: translateY(-20px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

.custom-table :deep(.v-data-table__tr:first-child) {
	animation: slideInFromTop 0.5s ease-out;
}

/* Responsive adjustments */
@media (max-width: 1280px) {
	.user-header-card :deep(.v-row) {
		flex-direction: column;
		text-align: center;
	}
	
	.user-header-card :deep(.v-col:last-child) {
		text-align: center !important;
		margin-top: 16px;
	}
}

@media (max-width: 768px) {
	.custom-table :deep(.v-data-table__wrapper) {
		font-size: 0.875rem;
	}
	
	.metric-card .v-card-text {
		padding: 12px !important;
	}
	
	.metric-card .text-h4 {
		font-size: 1.5rem !important;
	}
}

/* Chart styling */
:deep(.apexcharts-canvas) {
	background: transparent !important;
}

:deep(.apexcharts-tooltip) {
	background: var(--theme-primary, #2E5984) !important;
	color: white !important;
	border: none !important;
	border-radius: 8px !important;
}

/* Alert styling */
.v-alert {
	border-radius: 8px !important;
}

/* Loading states */
.metric-card.loading {
	opacity: 0.7;
	pointer-events: none;
}

/* Status indicators */
.status-online {
	color: #4CAF50 !important;
}

.status-offline {
	color: #F44336 !important;
}

.status-warning {
	color: #FF9800 !important;
}
</style>

