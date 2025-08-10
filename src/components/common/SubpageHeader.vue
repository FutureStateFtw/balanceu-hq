<template>
    <!-- STANDARDIZED SUBPAGE HEADER -->
    <div>
        <v-container fluid class="pa-0">
            <v-row no-gutters align="center" class="pa-4">
                <v-col cols="auto">
                    <v-btn
                        @click="goBack"
                        icon="mdi-arrow-left"
                        variant="text"
                        class="std-back-button me-3"
                        size="large"
                    />
                </v-col>
                <v-col>
                    <div class="text-h4 font-weight-bold std-text-glass">
                        Balance<span class="accent">U</span>
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
    backRoute: {
        type: String,
        default: null
    }
})

function goBack() {
    if (props.backRoute) {
        router.push(props.backRoute)
    } else {
        router.back()
    }
}
</script>

<script>
export default {
    name: 'SubpageHeader'
}
</script>

<style scoped>
/* ACCENT COLOR FOR BALANCEU LOGO */
.accent { 
    color: #FFC107; 
}
</style>
