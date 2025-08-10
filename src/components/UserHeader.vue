<template>
    <!-- USER DASHBOARD HEADER -->
    <v-row class="align-center mb-4 mb-md-6">
        <v-col cols="12" class="d-flex justify-space-between align-center flex-wrap">
            <div class="d-flex flex-column">
                <div class="text-h5 font-weight-bold text-white">BalanceU</div>
                <div class="text-caption text-white text-opacity-75">{{ formattedDate }}</div>
            </div>
            <div class="d-flex align-center">
                <div class="text-subtitle-2 text-white mr-2 text-right d-none d-sm-block">Welcome<br><strong>{{ userName }}</strong></div>
                <UserAvatar :user-name="userName" :photo-url="photoUrl" />
            </div>
        </v-col>
    </v-row>
</template>

<script>
import UserAvatar from './UserAvatar.vue'
export default {
    name: 'UserHeader',
    components: { UserAvatar },

    props: {
        userName: { type: String, default: 'Student' },
        photoUrl: { type: String, default: null }
    },

    computed: {
        // Friendly date at top
        formattedDate() {
            return new Intl.DateTimeFormat('en-US', {
                weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
            }).format(new Date())
        }
    }
}
</script>

<style scoped>
</style>
