<template>
    <!-- USER AVATAR WITH PHOTO -->
    <v-avatar size="40" class="elevation-2 user-profile-card">
        <v-img v-if="photoUrl" :src="photoUrl" cover></v-img>
        <div v-else class="d-flex align-center justify-center fill-height text-subtitle-2 font-weight-medium">
            {{ initials }}
        </div>
    </v-avatar>
</template>

<script>
export default {
    name: 'UserAvatar',

    props: {
        userName: { type: String, default: 'Student User' },
        photoUrl: { type: String, default: null }
    },

    computed: {
        // Initials fallback when no photo
        initials() {
            if (!this.userName) return 'SU'
            return this.userName.split(/\s+/).slice(0,2).map(p => p[0]).join('').toUpperCase()
        }
    }
}
</script>

<style scoped>
</style>
