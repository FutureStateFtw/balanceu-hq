<template>
	<v-dialog v-model="ui.showConfirmDialog" max-width="500">
		<div class="std-glass-panel pa-6">
			<div class="text-h6 mb-4 std-text-glass">
				{{ ui.confirmDialogTitle }}
			</div>

			<!-- Pre-line allows use of \n character in body -->
			<div class="text-body-1 mb-6 std-text-glass-subtitle" style="white-space: pre-line;"> 
				{{ ui.confirmDialogBody }}
			</div>

			<!-- LOADING SPINNER (if processing) -->
			<div v-if="ui.confirmDialogType === 'processing'" class="text-center mb-4">
				<v-progress-circular
					indeterminate
					color="primary"
					size="64"
				/>
				<div class="mt-3 text-body-2 std-text-glass-subtitle">Processing...</div>
			</div>

			<div class="d-flex justify-end">
				<v-btn 
					v-if="ui.confirmDialogType !== 'processing'"
					class="std-glass-button me-3" 
					@click="confirm(false)"
				>
					{{ ui.confirmDialogType === 'Ok' ? 'Cancel' : 'No' }}
				</v-btn>
				
				<v-btn 
					v-if="ui.confirmDialogType !== 'processing'"
					class="std-glass-button"
					color="primary" 
					@click="confirm(true)"
				>
					{{ ui.confirmDialogType === 'Ok' ? 'OK' : 'Yes' }}
				</v-btn>
			</div>
		</div>
	</v-dialog>
</template>

<script>
import { ui } from '@/stores'

export default {
	setup() {
		const confirm = (result) => {
			ui.resolveConfirm(result)
		}
		return { ui, confirm }
	}
}
</script>
