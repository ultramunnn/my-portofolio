<script setup>
import { ref } from 'vue'
import GitHubCalendar from '@/components/GitHubCalendar.vue'

const calendarStats = ref({
  source: 'github.com/ultramunnn',
  year: new Date().getFullYear(),
  totalContributions: 0,
  activeDays: 0,
})

const handleCalendarUpdate = (payload) => {
  calendarStats.value = payload
}
</script>

<template>
  <section id="log" class="w-full p-4 lg:p-8 scroll-mt-24">
    <div class="flex flex-col items-start space-y-1">
      <h2 class="text-xl font-bold">Log</h2>
      <span class="block w-10 border-b-2 border-accent"></span>
    </div>
    <div class="text-xs mt-4 font-mono text-green-600">HTTP/1.1 200 OK — GET /api/logs/activity</div>

    <pre
      class="mt-2 p-3 border border-border bg-paper dark:bg-paper-dark text-xs lg:text-sm font-mono overflow-x-auto"
    >
{
  "source": "{{ calendarStats.source }}",
  "period": "year {{ calendarStats.year }}",
  "total_commits": {{ calendarStats.totalContributions }},
  "active_days": {{ calendarStats.activeDays }},
  "notes": "Consistent development activity while continuing to learn"
}
    </pre>

    <div class="mt-4">
      <GitHubCalendar username="ultramunnn" :years-to-show="3" @update="handleCalendarUpdate" />
    </div>
  </section>
</template>
