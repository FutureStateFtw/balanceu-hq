<template>
	<v-container fluid class="pa-4 pa-md-6 liquid-glass-container">
		
		<!-- Header Section -->
		<v-row class="mb-8">
			<v-col cols="12" class="text-center">
				<h1 class="display-1 font-weight-light text-white mb-4 glass-text">
					Liquid Glass Interface
				</h1>
				<p class="text-h6 text-white opacity-80 mb-6">
					Experience Apple's latest design language with interactive glass morphism
				</p>
			</v-col>
		</v-row>

		<!-- Main Glass Cards Grid -->
		<v-row class="mb-8">
			<!-- System Status Card -->
			<v-col cols="12" md="6" lg="4">
				<div class="liquid-glass-card" @mouseenter="handleHover" @mouseleave="handleLeave">
					<div class="glass-content">
						<div class="glass-icon-container">
							<v-icon icon="mdi-server-network" size="48" class="glass-icon"></v-icon>
							<div class="specular-highlight"></div>
						</div>
						<h3 class="glass-title">System Health</h3>
						<div class="glass-metrics">
							<div class="metric-row">
								<span class="metric-label">Uptime</span>
								<span class="metric-value">99.97%</span>
							</div>
							<div class="metric-row">
								<span class="metric-label">Response</span>
								<span class="metric-value">12ms</span>
							</div>
							<div class="metric-row">
								<span class="metric-label">Load</span>
								<span class="metric-value">CPU 23%</span>
							</div>
						</div>
						<div class="glass-border-glow"></div>
					</div>
				</div>
			</v-col>

			<!-- Transaction Analytics Card -->
			<v-col cols="12" md="6" lg="4">
				<div class="liquid-glass-card transaction-card" @mouseenter="handleHover" @mouseleave="handleLeave">
					<div class="glass-content">
						<div class="glass-icon-container">
							<v-icon icon="mdi-chart-line-variant" size="48" class="glass-icon"></v-icon>
							<div class="specular-highlight"></div>
						</div>
						<h3 class="glass-title">Live Analytics</h3>
						<div class="glass-chart-area">
							<div class="mini-chart">
								<div class="chart-bar" style="height: 60%"></div>
								<div class="chart-bar" style="height: 80%"></div>
								<div class="chart-bar" style="height: 45%"></div>
								<div class="chart-bar" style="height: 90%"></div>
								<div class="chart-bar" style="height: 70%"></div>
								<div class="chart-bar" style="height: 95%"></div>
							</div>
						</div>
						<div class="glass-stats">
							<span class="stat-number">$127,482</span>
							<span class="stat-label">Today's Volume</span>
						</div>
						<div class="glass-border-glow"></div>
					</div>
				</div>
			</v-col>

			<!-- User Activity Card -->
			<v-col cols="12" md="6" lg="4">
				<div class="liquid-glass-card activity-card" @mouseenter="handleHover" @mouseleave="handleLeave">
					<div class="glass-content">
						<div class="glass-icon-container">
							<v-icon icon="mdi-account-group" size="48" class="glass-icon"></v-icon>
							<div class="specular-highlight"></div>
						</div>
						<h3 class="glass-title">Active Users</h3>
						<div class="user-avatars">
							<div class="glass-avatar" v-for="n in 5" :key="n"></div>
							<div class="more-users">+{{ 2341 - 5 }}</div>
						</div>
						<div class="activity-pulse">
							<div class="pulse-dot"></div>
							<span class="pulse-text">Live Activity</span>
						</div>
						<div class="glass-border-glow"></div>
					</div>
				</div>
			</v-col>
		</v-row>

		<!-- Interactive Glass Panels -->
		<v-row class="mb-8">
			<!-- Security Panel -->
			<v-col cols="12" md="6">
				<div class="liquid-glass-panel security-panel" @click="togglePanel('security')" :class="{ active: activePanels.security }">
					<div class="glass-content">
						<div class="panel-header">
							<div class="glass-icon-container">
								<v-icon icon="mdi-shield-check" size="36" class="glass-icon"></v-icon>
								<div class="specular-highlight"></div>
							</div>
							<div class="panel-title">
								<h4>Security Status</h4>
								<span class="status-indicator secure">Secure</span>
							</div>
						</div>
						<div class="panel-content" v-show="activePanels.security">
							<div class="security-item">
								<v-icon icon="mdi-lock" size="20" class="security-icon"></v-icon>
								<span>SSL Certificate Valid</span>
								<v-icon icon="mdi-check-circle" color="success" size="20"></v-icon>
							</div>
							<div class="security-item">
								<v-icon icon="mdi-firewall" size="20" class="security-icon"></v-icon>
								<span>Firewall Active</span>
								<v-icon icon="mdi-check-circle" color="success" size="20"></v-icon>
							</div>
							<div class="security-item">
								<v-icon icon="mdi-account-lock" size="20" class="security-icon"></v-icon>
								<span>2FA Enforced</span>
								<v-icon icon="mdi-check-circle" color="success" size="20"></v-icon>
							</div>
						</div>
						<div class="glass-border-glow"></div>
						<div class="interaction-ripple"></div>
					</div>
				</div>
			</v-col>

			<!-- Performance Panel -->
			<v-col cols="12" md="6">
				<div class="liquid-glass-panel performance-panel" @click="togglePanel('performance')" :class="{ active: activePanels.performance }">
					<div class="glass-content">
						<div class="panel-header">
							<div class="glass-icon-container">
								<v-icon icon="mdi-speedometer" size="36" class="glass-icon"></v-icon>
								<div class="specular-highlight"></div>
							</div>
							<div class="panel-title">
								<h4>Performance</h4>
								<span class="status-indicator optimal">Optimal</span>
							</div>
						</div>
						<div class="panel-content" v-show="activePanels.performance">
							<div class="performance-metric">
								<span class="metric-name">Memory Usage</span>
								<div class="metric-bar">
									<div class="metric-fill" style="width: 68%"></div>
								</div>
								<span class="metric-percentage">68%</span>
							</div>
							<div class="performance-metric">
								<span class="metric-name">CPU Load</span>
								<div class="metric-bar">
									<div class="metric-fill" style="width: 34%"></div>
								</div>
								<span class="metric-percentage">34%</span>
							</div>
							<div class="performance-metric">
								<span class="metric-name">Network I/O</span>
								<div class="metric-bar">
									<div class="metric-fill" style="width: 23%"></div>
								</div>
								<span class="metric-percentage">23%</span>
							</div>
						</div>
						<div class="glass-border-glow"></div>
						<div class="interaction-ripple"></div>
					</div>
				</div>
			</v-col>
		</v-row>

		<!-- Feature Showcase -->
		<v-row>
			<v-col cols="12">
				<div class="feature-showcase" @mouseenter="handleShowcaseHover" @mouseleave="handleShowcaseLeave">
					<div class="showcase-content">
						<h2 class="showcase-title">BalanceU Admin Platform</h2>
						<p class="showcase-description">
							Experience seamless campus card management with our next-generation interface.
							Built with cutting-edge design principles and intuitive interactions.
						</p>
						<div class="feature-grid">
							<div class="feature-item" v-for="feature in features" :key="feature.id">
								<div class="feature-icon">
									<v-icon :icon="feature.icon" size="24"></v-icon>
								</div>
								<span class="feature-name">{{ feature.name }}</span>
							</div>
						</div>
						<div class="showcase-glow"></div>
						<div class="floating-elements">
							<div class="floating-dot" v-for="n in 6" :key="n"></div>
						</div>
					</div>
				</div>
			</v-col>
		</v-row>

	</v-container>
</template>

<script setup>
import { theme } from '@/stores'
import { ref } from 'vue'
</script>

<script>
export default {
	data: () => ({
		activePanels: {
			security: false,
			performance: false
		},
		features: [
			{ id: 1, name: 'Real-time Analytics', icon: 'mdi-chart-line' },
			{ id: 2, name: 'Secure Transactions', icon: 'mdi-shield-check' },
			{ id: 3, name: 'Multi-campus Support', icon: 'mdi-domain' },
			{ id: 4, name: 'Mobile Integration', icon: 'mdi-cellphone' },
			{ id: 5, name: 'Smart Reporting', icon: 'mdi-file-chart' },
			{ id: 6, name: 'Cloud Infrastructure', icon: 'mdi-cloud' }
		]
	}),

	methods: {
		togglePanel(panel) {
			this.activePanels[panel] = !this.activePanels[panel]
		},

		handleHover(event) {
			const card = event.currentTarget
			card.classList.add('hovered')
			this.createSpecularEffect(event)
		},

		handleLeave(event) {
			const card = event.currentTarget
			card.classList.remove('hovered')
		},

		handleShowcaseHover(event) {
			const showcase = event.currentTarget
			showcase.classList.add('showcase-hovered')
		},

		handleShowcaseLeave(event) {
			const showcase = event.currentTarget
			showcase.classList.remove('showcase-hovered')
		},

		createSpecularEffect(event) {
			const rect = event.currentTarget.getBoundingClientRect()
			const x = ((event.clientX - rect.left) / rect.width) * 100
			const y = ((event.clientY - rect.top) / rect.height) * 100
			
			const highlight = event.currentTarget.querySelector('.specular-highlight')
			if (highlight) {
				highlight.style.left = `${x}%`
				highlight.style.top = `${y}%`
				highlight.style.opacity = '0.8'
			}
		}
	}
}
</script>

<style scoped>
.liquid-glass-container {
	min-height: 100vh;
	position: relative;
	overflow: hidden;
}

.glass-text {
	text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
}
</style>
