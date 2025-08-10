<template>
    <v-container fluid class="fill-height d-flex align-center justify-center login-gradient">
        <!-- LOGIN CARD -->
        <div class="login-card">
            <!-- LOGO AREA -->
            <div class="text-center mb-6">
                <v-img :src="logoSrc" max-width="220" class="mx-auto mb-4" v-if="hasLogo" />

            </div>

            <!-- FORM -->
            <v-form @submit.prevent="attemptLogin" :disabled="loading" ref="formRef">
                <v-text-field
                    v-model="username"
                    autocomplete="username"
                    variant="solo"
                    flat
                    rounded
                    bg-color="white"
                    density="comfortable"
                    hide-details
                    class="mb-4 login-input"
                    placeholder="Username"
                    autofocus
                />
                <v-text-field
                    v-model="password"
                    type="password"
                    autocomplete="current-password"
                    variant="solo"
                    flat
                    rounded
                    bg-color="white"
                    density="comfortable"
                    hide-details
                    class="mb-4 login-input"
                    placeholder="Password"
                />
                <div class="d-flex justify-end">
                    <v-btn :loading="loading" color="primary" class="login-btn" size="large" type="submit" icon>
                        <v-icon icon="mdi-arrow-right" />
                    </v-btn>
                </div>
            </v-form>

            <!-- ERROR -->
            <div v-if="error" class="text-caption mt-4 text-red-lighten-3 error-text">{{ error }}</div>
        </div>
    </v-container>
</template>

<script setup>
    import { ref, computed } from 'vue'
    import { user, ui } from '@/stores'
    import { useRouter } from 'vue-router'

    const router = useRouter()
    const username = ref('')
    const password = ref('')
    const loading = ref(false)
    const error = ref('')
    const formRef = ref(null)

    const logoSrc = '/src/assets/BalanceU_White_Login.webp'
    const hasLogo = true

    function attemptLogin() {
        error.value = ''
        loading.value = true
        setTimeout(() => { // simulate slight delay
            const success = user.login(username.value.trim(), password.value)
            loading.value = false
            if (success) {
                ui.snackText = 'Welcome ' + user.currentUser.displayName
                ui.snackColor = 'success'
                ui.snack = true
                router.push('/')
            } else {
                error.value = 'Invalid credentials'
            }
        }, 400)
    }
</script>

<script>
export default { name: 'LoginView' }
</script>

<style scoped>
.login-gradient { min-height: 100vh; }
.login-card {
    width: 520px;
    max-width: 90vw;
    padding: 54px 52px 58px 52px;
    background: linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.1) 100%);
    backdrop-filter: blur(26px);
    -webkit-backdrop-filter: blur(26px);
    border: 1px solid rgba(255,255,255,0.35);
    border-radius: 18px;
    box-shadow: 0 32px 70px -20px rgba(0,0,0,0.45), 0 12px 32px rgba(0,0,0,0.25);
    position: relative;
}
.login-input :deep(.v-field) { box-shadow: none !important; }
.login-input :deep(input) { font-size: .85rem; }
.login-btn { backdrop-filter: blur(8px); }
.accent { color: #FFC107; }
.error-text { letter-spacing: .5px; }
@media (max-width: 600px) {
  .login-card { padding: 40px 32px 46px 32px; width: 420px; }
}
</style>
