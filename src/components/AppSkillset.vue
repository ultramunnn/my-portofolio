<script setup>
import SkillOrbit from '@/components/SkillOrbit.vue'

const skills = [
  { category: 'Backend', items: ['Go', 'PHP', 'Laravel', 'Node.js', 'MySQL', 'PostgreSQL'] },
  { category: 'Frontend', items: ['React', 'Vue.js', 'HTML5', 'CSS3', 'Tailwind', 'JavaScript'] },
  { category: 'Mobile', items: ['Flutter'] },
  { category: 'Tools', items: ['Git', 'Docker'] },
]
</script>

<template>
  <section id="skillset" class="w-full p-4 lg:p-8 scroll-mt-24">
    <div class="flex flex-col items-start space-y-1">
      <h2 class="text-xl font-bold">Skillset</h2>
      <span class="block w-20 border-b-2 border-accent"></span>
    </div>

    <div class="mt-4 text-xs font-mono text-green-600">HTTP/1.1 200 OK — GET /api/skillset</div>

    <!-- 3D Orbiting Ring -->
    <div class="mt-2 border border-border dark:border-border-dark overflow-hidden">
      <SkillOrbit />
    </div>

    <!-- Skill Legend -->
    <div class="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3">
      <div
        v-for="group in skills"
        :key="group.category"
        class="text-xs font-mono"
      >
        <span class="text-accent font-bold">{{ group.category }}:</span>
        <span class="text-muted dark:text-muted-dark ml-1">
          {{ group.items.join(', ') }}
        </span>
      </div>
    </div>

    <p class="mt-3 text-xs text-muted">
      Drag to spin the ring. Skills orbiting in 3D space.
    </p>
  </section>
</template>
