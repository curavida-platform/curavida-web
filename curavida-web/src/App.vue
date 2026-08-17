<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'
import { useAuthStore } from './stores/auth.js'

import Navbar from './components/layout/Navbar.vue'
import Footer from './components/layout/Footer.vue'

const route = useRoute()

const showFooter = computed(() => {
       return route.name === 'home'
})

const authStore = useAuthStore()

onMounted(async () => {
       await authStore.fetchUser()
})
</script>

<template>
       <Navbar />

  <main>
    <router-view />
  </main>

  <Footer v-if="showFooter" />
</template>