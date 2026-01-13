<script setup>
import { ref } from 'vue'

defineProps({
  isDark: Boolean,
})

const emit = defineEmits(['toggle-dark'])
const isOpen = ref(false)

const menu = [
  { label: 'Profile', href: '/#profile' },
  { label: 'Skillset', href: '/#skillset' },
  { label: 'Project', href: '/#project' },
  { label: 'Log', href: '/#log' },
  { label: 'Certificate', href: '/Certificate' },
  { label: 'Contact', href: '/#contact' },
];
</script>

<template>
  <!-- Header -->
  <header
    class="fixed z-50 top-0 left-0 w-full border-b border-border dark:border-border-dark bg-paper/95 dark:bg-paper-dark/95 backdrop-blur"
  >
    <div class="container mx-auto flex items-center justify-between py-4 px-4">
      <!-- Mobile Menu Button -->
      <button
        class="md:hidden p-2 hover:text-accent transition-colors"
        @click="isOpen = !isOpen"
        :aria-label="isOpen ? 'Close menu' : 'Open menu'"
      >
        {{ isOpen ? '✕' : '☰' }}
      </button>

      <!-- Desktop Menu -->
      <nav class="hidden md:flex gap-6 text-sm">
        <ul class="flex gap-6 ">
          <li
            v-for="m in menu"
            :key="m.href"
            class="hover:text-accent transition-colors uppercase font-[Courier]"
          >
            <router-link
              v-if="m.href.startsWith('/')"
              :to="m.href"
              class="hover:text-accent transition-colors uppercase font-[Courier]"
              >{{ m.label }}
            </router-link>
            <a
              v-else
              :href="m.href"
              class="hover:text-accent transition-colors uppercase font-[Courier]"
            >
              {{ m.label }}
            </a>
          </li>
        </ul>
      </nav>

      <!-- Controls -->
      <div class="flex items-center gap-3">
        <!-- Dark Mode Toggle -->
        <button
          @click="emit('toggle-dark')"
          class="px-3 py-2 border border-border dark:border-border-dark rounded hover:bg-accent hover:text-paper transition-all"
          :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
        >
          {{ isDark ? 'Light' : 'Dark' }}
        </button>
      </div>
    </div>
  </header>

  <!-- Mobile Overlay -->
  <Transition name="fade">
    <div v-if="isOpen" class="fixed inset-0 bg-black/50 z-40 md:hidden" @click="isOpen = false" />
  </Transition>

  <!-- Mobile Sidebar -->
  <Transition name="slide">
    <aside
      v-if="isOpen"
      class="fixed top-0 left-0 h-full w-40 bg-paper dark:bg-paper-dark border-r border-border dark:border-border-dark z-50 md:hidden"
    >
      <!-- Sidebar Header -->
      <div
        class="flex items-center justify-between p-6 border-b border-border dark:border-border-dark"
      >
        <span class="font-bold text-lg mt-0.5">Menu</span>
        <button
          class="text-xl hover:text-accent transition-colors"
          @click="isOpen = false"
          aria-label="Close menu"
        >
          ✕
        </button>
      </div>

      <!-- Sidebar Navigation -->
      <nav class="flex flex-col p-4">
        <ul class="flex flex-col space-y-4 text-xs mt-4">
          <li v-for="m in menu" :key="m.href">
            <!-- internal route -->
            <router-link
              v-if="m.href.startsWith('/')"
              :to="m.href"
              @click="isOpen = false"
              class="px-4 py-2 hover:bg-accent/10 hover:text-accent rounded transition-all uppercase font-[Courier]"
            >
              {{ m.label }}
            </router-link>

            <!-- anchor link -->
            <a
              v-else
              :href="m.href"
              @click="isOpen = false"
              class="px-4 py-2 hover:bg-accent/10 hover:text-accent rounded transition-all uppercase font-[Courier]"
            >
              {{ m.label }}
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
