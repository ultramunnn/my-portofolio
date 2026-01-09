<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const now = ref('')

function formatTime(date) {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  const formattedDate = date.toLocaleDateString('id-ID', options)

  const h = String(date.getHours()).padStart(2, '0')
  const m = String(date.getMinutes()).padStart(2, '0')
  const s = String(date.getSeconds()).padStart(2, '0')
  const formattedTime = `${h}.${m}:${s}`

  return `${formattedDate} - ${formattedTime}`
}

let timer

onMounted(() => {
  const today = new Date()
  now.value = formatTime(today)

  timer = setInterval(() => {
    const nowDate = new Date()
    now.value = formatTime(nowDate)
  }, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})

const fullText = 'MUHAMMAD SHIROJUL MUNIR'
const displayed = ref('')

onMounted(() => {
  let i = 0
  const interval = setInterval(() => {
    displayed.value += fullText[i]
    i++
    if (i === fullText.length) clearInterval(interval)
  }, 100)
})
</script>

<template>
  <section
    class="w-full min-h-max md:h-40 lg:h-48 border-accent border px-4 md:px-6 lg:px-8 flex flex-col justify-center space-y-1 py-2 lg:py-6"
  >
    <div class="flex items-center text-base sm:text-lg md:text-xl text-muted">
      <span class="font-[courier] text-muted dark:text-muted-dark text-sm md:text-lg">{{
        now
      }}</span>
    </div>

    <div class="font-semibold mt-2 text-lg sm:text-xl md:text-4xl lg:text-6xl whitespace-nowrap">
      <h1>{{ displayed }} <span class="animated-pulse text-accent blink">|</span></h1>
    </div>

    <div class="font-light text-xs md:text-sm font-[Courier] mt-4 tracking-widest">
      <ul class="space-y-1">
        <li class="grid grid-cols-[70px_auto] md:grid-cols-[100px_auto] gap-x-2">
          <span>STATUS</span>
          <span class="text-green-600 font-bold">
            : <span class="animate-pulse">● Active</span>
          </span>
        </li>

        <li class="grid grid-cols-[70px_auto] md:grid-cols-[100px_auto] gap-x-2">
          <span>FOCUS</span>
          <span>: Backend dev, Mobile dev</span>
        </li>

        <li class="grid grid-cols-[70px_auto] md:grid-cols-[100px_auto] gap-x-2">
          <span>COLLEGE</span>
          <span>: Brawijaya University</span>
        </li>

        <li class="grid grid-cols-[70px_auto] md:grid-cols-[100px_auto] gap-x-2">
          <span>LOCATION</span>
          <span>: Kediri, Indonesia</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

.blink {
  animation: blink 1s step-start infinite;
}
</style>
