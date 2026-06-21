<script setup>
import PhotoCarousel from '@/components/PhotoCarousel.vue'
import { projects } from '@/constants/projects'

const formatStack = (stack) => stack.map((s) => `"${s}"`).join(', ')
</script>

<template>
  <section id="project" class="w-full p-4 lg:p-8 scroll-mt-24">
    <div class="flex flex-col items-start space-y-1">
      <h2 class="text-xl font-bold">Projects</h2>
      <span class="block w-21 border-b-2 border-accent"></span>
    </div>

    <div class="mt-4 text-xs font-mono text-green-600">
      HTTP/1.1 200 OK — GET /api/projects
    </div>

    <div class="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div
        v-for="project in projects"
        :key="project.name"
        class="border border-border dark:border-border-dark"
      >
        <!-- Photo carousel -->
        <PhotoCarousel :photos="project.photos" :alt="project.name" />

        <!-- Project info as API response -->
        <div class="p-3 border-t border-border dark:border-border-dark">
          <div class="text-[10px] font-mono text-muted dark:text-muted-dark mb-2">
            // {{ project.period }}
          </div>
          <pre
            class="text-xs lg:text-sm font-mono text-ink dark:text-ink-dark overflow-x-auto whitespace-pre-wrap"
          >{
  "name": "{{ project.name }}",
  "stack": [{{ formatStack(project.stack) }}],
  "notes": "{{ project.notes }}"
}</pre>
        </div>
      </div>
    </div>

    <p class="mt-4 text-xs text-muted">Project records documented in API-style format.</p>
  </section>
</template>
