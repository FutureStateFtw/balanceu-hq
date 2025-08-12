<template>
	<v-container fluid class="pa-6">
		<v-row justify="center">
			<v-col cols="12" lg="10" xl="8">
				
				<!-- Hero Section -->
				<v-card color="primary" class="mb-8 hero-card" elevation="8">
					<v-card-text class="pa-8 text-center">
						<v-avatar size="80" color="accent" class="mb-4">
							<v-icon icon="mdi-shield-account" size="x-large" color="primary"></v-icon>
						</v-avatar>
						<h1 class="text-h3 font-weight-light text-white mb-4">BalanceU HQ Portal</h1>
						<p class="text-h6 text-white opacity-90 font-weight-light mb-0">
							Where Operational Intelligence Lives
						</p>
					</v-card-text>
				</v-card>

				<!-- Main Content Grid -->
				<v-row>
					<!-- Left Column - Main Description -->
					<v-col cols="12" md="8">
						<v-card color="secondary" class="mb-6 content-card" elevation="6">
							<v-card-text class="pa-6">
								<div class="d-flex align-center mb-4">
									<v-icon icon="mdi-view-dashboard" color="accent" size="large" class="mr-3"></v-icon>
									<h2 class="text-h4 font-weight-light text-white">Unified Administrative Control</h2>
								</div>
								<p class="text-body-1 text-white opacity-90 mb-4 leading-relaxed">
									The BalanceU HQ Admin Portal serves as your central command center for all administrative operations. 
									This comprehensive platform empowers administrators to oversee every aspect of the BalanceU ecosystem 
									with precision and efficiency.
								</p>
								<p class="text-body-1 text-white opacity-90 mb-0 leading-relaxed">
									From account management to financial oversight, from system configuration to real-time monitoring, 
									this unified workspace brings together all the tools you need to maintain operational excellence 
									across your organization.
								</p>
							</v-card-text>
						</v-card>

						<!-- Feature Cards -->
						<v-row>
							<v-col cols="12" sm="6">
								<v-card color="accent" class="feature-card h-100" elevation="4">
									<v-card-text class="pa-4 text-center">
										<v-icon icon="mdi-account-group" size="x-large" color="primary" class="mb-3"></v-icon>
										<h3 class="text-h6 font-weight-medium text-primary mb-2">Account Management</h3>
										<p class="text-body-2 text-primary opacity-80 mb-0">
											Comprehensive user account oversight with advanced permissions and access controls
										</p>
									</v-card-text>
								</v-card>
							</v-col>
							<v-col cols="12" sm="6">
								<v-card color="accent" class="feature-card h-100" elevation="4">
									<v-card-text class="pa-4 text-center">
										<v-icon icon="mdi-cog-outline" size="x-large" color="primary" class="mb-3"></v-icon>
										<h3 class="text-h6 font-weight-medium text-primary mb-2">Balance Logic</h3>
										<p class="text-body-2 text-primary opacity-80 mb-0">
											Configure and fine-tune balance algorithms to meet your specific operational requirements
										</p>
									</v-card-text>
								</v-card>
							</v-col>
							<v-col cols="12" sm="6">
								<v-card color="accent" class="feature-card h-100" elevation="4">
									<v-card-text class="pa-4 text-center">
										<v-icon icon="mdi-chart-line" size="x-large" color="primary" class="mb-3"></v-icon>
										<h3 class="text-h6 font-weight-medium text-primary mb-2">Financial Monitoring</h3>
										<p class="text-body-2 text-primary opacity-80 mb-0">
											Real-time financial activity tracking with advanced analytics and reporting capabilities
										</p>
									</v-card-text>
								</v-card>
							</v-col>
							<v-col cols="12" sm="6">
								<v-card color="accent" class="feature-card h-100" elevation="4">
									<v-card-text class="pa-4 text-center">
										<v-icon icon="mdi-connection" size="x-large" color="primary" class="mb-3"></v-icon>
										<h3 class="text-h6 font-weight-medium text-primary mb-2">System Connections</h3>
										<p class="text-body-2 text-primary opacity-80 mb-0">
											Manage integrations and oversee all system connections from a centralized interface
										</p>
									</v-card-text>
								</v-card>
							</v-col>
						</v-row>
					</v-col>

					<!-- Right Column - AI Assistant -->
					<v-col cols="12" md="4">
						<v-card color="info" class="ai-card" elevation="6">
							<v-card-text class="pa-6 text-center">
								<v-avatar size="60" color="accent" class="mb-4">
									<v-icon icon="mdi-robot" size="large" color="primary"></v-icon>
								</v-avatar>
								<h2 class="text-h5 font-weight-medium text-white mb-4">FutureState Assistant</h2>
								<p class="text-body-1 text-white opacity-90 mb-4">
									At the heart of your administrative experience lies our embedded AI assistant, 
									designed to revolutionize how you interact with complex systems.
								</p>
								
								<v-divider class="my-4 opacity-30"></v-divider>
								
								<div class="text-left">
									<div class="d-flex align-center mb-3">
										<v-icon icon="mdi-message-text" color="accent" class="mr-2"></v-icon>
										<span class="text-white font-weight-medium">Natural Language Processing</span>
									</div>
									<div class="d-flex align-center mb-3">
										<v-icon icon="mdi-lightning-bolt" color="accent" class="mr-2"></v-icon>
										<span class="text-white font-weight-medium">Instant Action Execution</span>
									</div>
									<div class="d-flex align-center mb-3">
										<v-icon icon="mdi-chart-timeline-variant" color="accent" class="mr-2"></v-icon>
										<span class="text-white font-weight-medium">Intelligent Analysis</span>
									</div>
									<div class="d-flex align-center">
										<v-icon icon="mdi-wrench" color="accent" class="mr-2"></v-icon>
										<span class="text-white font-weight-medium">Rapid Issue Resolution</span>
									</div>
								</div>

								<v-btn color="accent" class="mt-4" block size="large">
									<v-icon icon="mdi-chat" class="mr-2"></v-icon>
									Launch Assistant
								</v-btn>
							</v-card-text>
						</v-card>
					</v-col>
				</v-row>

				<!-- Bottom Stats -->
				<v-row class="mt-6">
					<v-col cols="12">
						<v-card color="success" class="stats-card" elevation="4">
							<v-card-text class="pa-6">
								<h3 class="text-h5 font-weight-light text-white mb-4 text-center">
									Experience Unprecedented Speed and Clarity
								</h3>
								<v-row class="text-center">
									<v-col cols="6" sm="3">
										<div class="text-h4 font-weight-bold text-white">99.9%</div>
										<div class="text-body-2 text-white opacity-80">Uptime</div>
									</v-col>
									<v-col cols="6" sm="3">
										<div class="text-h4 font-weight-bold text-white">&lt;2s</div>
										<div class="text-body-2 text-white opacity-80">Response Time</div>
									</v-col>
									<v-col cols="6" sm="3">
										<div class="text-h4 font-weight-bold text-white">24/7</div>
										<div class="text-body-2 text-white opacity-80">Monitoring</div>
									</v-col>
									<v-col cols="6" sm="3">
										<div class="text-h4 font-weight-bold text-white">∞</div>
										<div class="text-body-2 text-white opacity-80">Possibilities</div>
									</v-col>
								</v-row>
							</v-card-text>
						</v-card>
					</v-col>
				</v-row>

			</v-col>
		</v-row>
	</v-container>
</template>


<script setup>
import { theme } from '@/stores'
</script>

<script>
export default {
	data: () => ({}),
	methods: {
		goHome() { this.$router.push({ name: "Home" }) },
	}
}
</script>

<style scoped>
.hero-card {
	background: linear-gradient(135deg, var(--theme-primary, #2E5984) 0%, var(--theme-secondary, #4A90E2) 100%) !important;
	border-radius: 16px !important;
	transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hero-card:hover {
	transform: translateY(-4px);
}

.content-card {
	background: var(--theme-secondary, #4A90E2) !important;
	border-radius: 12px !important;
	transition: transform 0.3s ease;
}

.content-card:hover {
	transform: translateY(-2px);
}

.feature-card {
	background: var(--theme-accent, #87CEEB) !important;
	border-radius: 12px !important;
	transition: all 0.3s ease;
	cursor: pointer;
}

.feature-card:hover {
	transform: translateY(-4px) scale(1.02);
	box-shadow: 0 12px 40px rgba(0,0,0,0.15) !important;
}

.ai-card {
	background: var(--theme-info, #2196F3) !important;
	border-radius: 12px !important;
	position: sticky;
	top: 100px;
}

.stats-card {
	background: var(--theme-success, #4CAF50) !important;
	border-radius: 12px !important;
}

.leading-relaxed {
	line-height: 1.7 !important;
}

.v-avatar {
	box-shadow: 0 4px 20px rgba(0,0,0,0.2);
}

.v-icon {
	filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
}

.v-card {
	backdrop-filter: blur(10px);
	-webkit-backdrop-filter: blur(10px);
}

.v-btn {
	text-transform: none !important;
	font-weight: 500 !important;
	letter-spacing: 0.5px !important;
}

/* Responsive adjustments */
@media (max-width: 960px) {
	.ai-card {
		position: static;
		margin-top: 24px;
	}
}

/* Animation for feature cards */
.feature-card .v-icon {
	transition: transform 0.3s ease;
}

.feature-card:hover .v-icon {
	transform: scale(1.1) rotate(5deg);
}
</style>

