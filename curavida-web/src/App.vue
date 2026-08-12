<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import Navbar from './components/layout/Navbar.vue'
import Footer from './components/layout/Footer.vue'

const route = useRoute()

const showFooter = computed(() => {
  return route.name !== 'produtos' && route.name !== 'product-details'
})
</script>

<template>
  <Navbar />

  <main>
    <router-view />
  </main>

  <Footer v-if="showFooter" />
</template>