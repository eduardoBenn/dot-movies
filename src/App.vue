<template>
  <main
    :class="themeClass"
    class="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white"
  >
    <Toast />
    <AppHeader :onToggleTheme="toggleTheme" :isDark="isDark" />
    <RouterView />
  </main>
</template>

<script setup lang="ts">
  import Toast from 'primevue/toast'
  import { computed, ref } from 'vue'
  import { RouterView } from 'vue-router'
  import AppHeader from './components/AppHeader/AppHeader.vue'

  const isDark = ref(true)
  const themeClass = computed(() => (isDark.value ? 'my-app-dark' : 'my-app-light'))

  function toggleTheme() {
    isDark.value = !isDark.value
  }
</script>
