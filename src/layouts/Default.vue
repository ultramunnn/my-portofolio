<script setup>
import AppHeader from '@/components/AppHeader.vue'
import { useDarkMode } from '@/composables/useDarkMode'

const { isDark, toggleDarkMode } = useDarkMode()
</script>

<template>
  <div class="min-h-screen bg-paper text-ink dark:bg-paper-dark dark:text-ink-dark">
    <AppHeader :isDark="isDark" @toggle-dark="toggleDarkMode" />
    <main class="pt-20">
      <slot />
    </main>
  </div>
</template>
