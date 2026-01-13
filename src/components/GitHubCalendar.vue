<script setup>
import { computed, onMounted, ref, watch } from 'vue'

const props = defineProps({
  username: { type: String, required: true },
  yearsToShow: { type: Number, default: 4 },
})

const emit = defineEmits(['update'])

const now = new Date()
const selectedYear = ref(now.getFullYear())
const loading = ref(false)
const error = ref('')
const calendar = ref(null)

const years = computed(() => {
  const list = []
  for (let i = 0; i < props.yearsToShow; i += 1) {
    list.push(now.getFullYear() - i)
  }
  return list
})

const totalContributions = computed(() => calendar.value?.totalContributions ?? 0)
const weeks = computed(() => calendar.value?.weeks ?? [])
const months = computed(() => calendar.value?.months ?? [])
const activeDays = computed(() => {
  let count = 0
  weeks.value.forEach((week) => {
    week.contributionDays.forEach((day) => {
      if (day.contributionCount > 0) {
        count += 1
      }
    })
  })
  return count
})

const cellSize = 12
const cellGap = 4

const monthPositions = computed(() => {
  const list = []
  if (!weeks.value.length || !months.value.length) return list

  const weekIndexByDate = new Map()
  weeks.value.forEach((week, index) => {
    week.contributionDays.forEach((day) => {
      weekIndexByDate.set(day.date, index)
    })
  })

  months.value.forEach((m) => {
    const index = weekIndexByDate.get(m.firstDay)
    if (index !== undefined) {
      list.push({ name: m.name, index })
    }
  })

  return list
})

const fetchCalendar = async () => {
  error.value = ''
  loading.value = true
  calendar.value = null

  const token = import.meta.env.VITE_GITHUB_TOKEN
  if (!token) {
    loading.value = false
    error.value = 'Set VITE_GITHUB_TOKEN to load GitHub contributions.'
    return
  }

  const from = new Date(Date.UTC(selectedYear.value, 0, 1, 0, 0, 0))
  const to = new Date(Date.UTC(selectedYear.value, 11, 31, 23, 59, 59))

  const query = `
    query($login: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $login) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            totalContributions
            months { firstDay name totalWeeks }
            weeks {
              contributionDays { date contributionCount weekday }
            }
          }
        }
      }
    }
  `

  try {
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: {
          login: props.username,
          from: from.toISOString(),
          to: to.toISOString(),
        },
      }),
    })

    if (!res.ok) {
      throw new Error(`GitHub API error: ${res.status}`)
    }

    const json = await res.json()
    const data = json?.data?.user?.contributionsCollection?.contributionCalendar
    if (!data) {
      throw new Error('No contribution data.')
    }
    calendar.value = data
    emit('update', {
      source: `github.com/${props.username}`,
      year: selectedYear.value,
      totalContributions: data.totalContributions,
      activeDays: activeDays.value,
    })
  } catch (e) {
    error.value = e?.message || 'Failed to load contributions.'
  } finally {
    loading.value = false
  }
}

const pickYear = (year) => {
  if (selectedYear.value !== year) {
    selectedYear.value = year
  }
}

watch(selectedYear, fetchCalendar)
onMounted(fetchCalendar)
</script>

<template>
  <section class="gh-card">
    <header class="gh-header">
      <div class="gh-title">{{ totalContributions }} Contributions in {{ selectedYear }}</div>
      <div class="gh-years">
        <div class="gh-year-label">Contribution settings</div>
        <div class="gh-year-list">
          <button
            v-for="year in years"
            :key="year"
            class="gh-year"
            :class="{ active: year === selectedYear }"
            type="button"
            @click="pickYear(year)"
          >
            {{ year }}
          </button>
        </div>
        <select v-model.number="selectedYear" class="gh-year-select" aria-label="Select year">
          <option v-for="year in years" :key="year" :value="year">
            {{ year }}
          </option>
        </select>
      </div>
    </header>

    <div v-if="error" class="gh-message">{{ error }}</div>
    <div v-else-if="loading" class="gh-message">Loading contributions...</div>

    <div v-else>
      <div class="gh-grid">
        <div class="gh-grid-inner">
          <div class="gh-months">
            <span
              v-for="m in monthPositions"
              :key="`${m.name}-${m.index}`"
              class="gh-month"
              :style="{ left: `${m.index * (cellSize + cellGap)}px` }"
            >
              {{ m.name }}
            </span>
          </div>

          <div class="gh-body">
            <div class="gh-weekdays">
              <span class="gh-weekday">Mon</span>
              <span class="gh-weekday"></span>
              <span class="gh-weekday">Wed</span>
              <span class="gh-weekday"></span>
              <span class="gh-weekday">Fri</span>
              <span class="gh-weekday"></span>
              <span class="gh-weekday"></span>
            </div>

            <div class="gh-weeks">
              <div v-for="(week, index) in weeks" :key="index" class="gh-week">
                <span
                  v-for="day in week.contributionDays"
                  :key="day.date"
                  class="gh-day"
                  :style="{ backgroundColor: day.contributionCount ? null : 'var(--gh-level-0)' }"
                  :data-level="Math.min(day.contributionCount, 4)"
                  :title="`${day.contributionCount} Contributions on ${day.date}`"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="gh-legend">
        <span>Less</span>
        <span class="gh-legend-box level-0"></span>
        <span class="gh-legend-box level-1"></span>
        <span class="gh-legend-box level-2"></span>
        <span class="gh-legend-box level-3"></span>
        <span class="gh-legend-box level-4"></span>
        <span>More</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.gh-card {
  background-color: var(--gh-card-bg, var(--color-paper));
  color: var(--gh-text, var(--color-ink));
  border: 1px solid var(--color-border);
  border-radius: 0;
  padding: 16px;
  overflow: visible;
}

.gh-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 12px;
}

.gh-title {
  font-size: 18px;
  font-weight: 600;
  color: inherit;
}

.gh-years {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
}

.gh-year-label {
  font-size: 12px;
  color: var(--gh-muted, var(--color-muted));
  text-align: left;
}

.gh-year-list {
  display: flex;
  gap: 8px;
}

.gh-year {
  background: transparent;
  color: inherit;
  border: 1px solid transparent;
  padding: 6px 14px;
  font-size: 13px;
  cursor: pointer;
}

.gh-year.active {
  background: var(--color-accent);
  color: var(--color-paper);
  border-color: var(--color-accent);
}

.gh-year-select {
  display: none;
  width: 100%;
  padding: 6px 10px;
  border-radius: 8px;
  border: 1px solid var(--color-accent);
  background: var(--color-accent);
  color: var(--color-paper);
  font-size: 13px;
}

.gh-message {
  padding: 12px;
  font-size: 13px;
  color: var(--gh-muted, var(--color-muted));
}

.gh-grid {
  overflow-x: auto;
  overflow-y: hidden;
  padding-bottom: 8px;
  -webkit-overflow-scrolling: touch;
  scrollbar-gutter: stable;
  touch-action: pan-x;
}

.gh-grid-inner {
  min-width: 780px;
  width: max-content;
}

.gh-months {
  position: relative;
  height: 18px;
  margin-left: 36px;
  margin-bottom: 8px;
}

.gh-month {
  position: absolute;
  top: 0;
  font-size: 12px;
  color: var(--gh-text, var(--color-ink));
}

.gh-body {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-top: 2px;
}

.gh-weekdays {
  display: grid;
  grid-template-rows: repeat(7, var(--cell-size));
  gap: var(--cell-gap);
  font-size: 12px;
  color: var(--gh-muted, var(--color-muted));
  padding-top: 2px;
  margin-right: 4px;
}

.gh-weeks {
  display: flex;
  gap: var(--cell-gap);
}

.gh-week {
  display: grid;
  grid-template-rows: repeat(7, var(--cell-size));
  gap: var(--cell-gap);
}

.gh-day {
  width: var(--cell-size);
  height: var(--cell-size);
  background: var(--gh-level-0);
  border-radius: 2px;
}

.gh-day[data-level='1'] {
  background: var(--gh-level-1);
}
.gh-day[data-level='2'] {
  background: var(--gh-level-2);
}
.gh-day[data-level='3'] {
  background: var(--gh-level-3);
}
.gh-day[data-level='4'] {
  background: var(--gh-level-4);
}

.gh-legend {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 12px;
  color: var(--gh-muted, var(--color-muted));
  font-size: 12px;
  justify-content: flex-end;
  flex-wrap: wrap;
}

.gh-legend-box {
  width: var(--cell-size);
  height: var(--cell-size);
  border-radius: 2px;
}

.gh-legend-box.level-0 {
  background: var(--gh-level-0);
}
.gh-legend-box.level-1 {
  background: var(--gh-level-1);
}
.gh-legend-box.level-2 {
  background: var(--gh-level-2);
}
.gh-legend-box.level-3 {
  background: var(--gh-level-3);
}
.gh-legend-box.level-4 {
  background: var(--gh-level-4);
}

.gh-card {
  --cell-size: 12px;
  --cell-gap: 4px;
  --gh-level-0: #e6dfcf;
  --gh-level-1: #d9b5b5;
  --gh-level-2: #c98e8e;
  --gh-level-3: #b86464;
  --gh-level-4: #8b0000;
}

:global(.dark) .gh-card,
:global(html.dark) .gh-card,
:global(body.dark) .gh-card {
  --gh-card-bg: var(--color-paper-dark);
  --gh-text: var(--color-ink-dark);
  --gh-muted: var(--color-muted-dark);
  border-color: var(--color-accent);
  --gh-level-0: #262626;
  --gh-level-1: #3a2a2a;
  --gh-level-2: #5a2f2f;
  --gh-level-3: #7a3434;
  --gh-level-4: #9a3a3a;
}

:global(.dark) .gh-year-select {
  background: var(--color-accent);
  border-color: var(--color-accent);
  color: var(--color-paper);
}

@media (max-width: 640px) {
  .gh-title {
    font-size: 16px;
  }

  .gh-year-list {
    display: none;
  }

  .gh-year-select {
    display: inline-block;
    width: auto;
    min-width: 110px;
  }

  .gh-years {
    align-items: flex-start;
  }
}
</style>
