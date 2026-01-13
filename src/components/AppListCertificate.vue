<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { images } from '@/constants/imageportofolio'

type CertificateItem = {
  title?: string
  tilte?: string
  href: string
  date: string
  publisher?: string
}

type CertificateView = {
  title: string
  href: string
  date: string
  publisher: string
  thumbnail: string
  preview: string
  sortDate: Date
}

const driveIdFromUrl = (href: string) => {
  const match = href.match(/\/d\/([^/]+)\//) || href.match(/[?&]id=([^&]+)/)
  return match ? match[1] : ''
}

const thumbnailFromUrl = (href: string, size = 1000) => {
  const id = driveIdFromUrl(href)
  return id ? `https://drive.google.com/thumbnail?id=${id}&sz=w${size}` : ''
}

const monthMap: Record<string, number> = {
  jan: 0,
  feb: 1,
  mar: 2,
  apr: 3,
  may: 4,
  mei: 4,
  jun: 5,
  jul: 6,
  aug: 7,
  agu: 7,
  sep: 8,
  oct: 9,
  okt: 9,
  nov: 10,
  dec: 11,
  des: 11,
}

const parseDate = (value: string) => {
  const normalized = value.trim().replace(',', '')
  const parts = normalized.split(/\s+/)
  if (parts.length < 3) {
    return new Date(0)
  }

  const [monthRaw, dayRaw, yearRaw] = parts
  const monthKey = monthRaw.toLowerCase().slice(0, 3)
  const monthIndex = monthMap[monthKey]
  const day = Number.parseInt(dayRaw, 10)
  const year = Number.parseInt(yearRaw, 10)

  if (Number.isNaN(day) || Number.isNaN(year) || monthIndex === undefined) {
    return new Date(0)
  }

  return new Date(year, monthIndex, day)
}

const certificates = computed<CertificateView[]>(() =>
  (images as CertificateItem[])
    .map((item) => ({
      title: item.title ?? item.tilte ?? 'Untitled certificate',
      href: item.href,
      date: item.date,
      publisher: item.publisher ?? 'Unknown',
      thumbnail: thumbnailFromUrl(item.href, 1000),
      preview: thumbnailFromUrl(item.href, 2000),
      sortDate: parseDate(item.date),
    }))
    .sort((a, b) => b.sortDate.getTime() - a.sortDate.getTime()),
)

const activeItem = ref<CertificateView | null>(null)

const openPreview = (item: CertificateView) => {
  activeItem.value = item
}

const closePreview = () => {
  activeItem.value = null
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    closePreview()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <section class="container mx-auto px-4 py-12">
    <div class="flex flex-col gap-2">
      <h1 class="text-2xl font-semibold tracking-tight">Certificates</h1>
      <p class="text-sm text-ink/70 dark:text-ink-dark/70">
        Click the card to view the certificate.
      </p>
    </div>

    <div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <article
        v-for="item in certificates"
        :key="item.href"
        class="rounded-xl border border-border/70 dark:border-border-dark/70 bg-paper/80 dark:bg-paper-dark/70 p-4 shadow-sm"
      >
        <button
          type="button"
          class="relative h-48 w-full overflow-hidden rounded-lg border border-border/60 dark:border-border-dark/60 bg-paper-dark/5 dark:bg-paper/5 text-left"
          @click="openPreview(item)"
          @contextmenu.prevent
          @dragstart.prevent
        >
          <img
            v-if="item.thumbnail"
            :src="item.thumbnail"
            :alt="item.title"
            class="h-full w-full object-cover select-none"
            loading="lazy"
            draggable="false"
          />
          <div
            v-else
            class="flex h-full w-full items-center justify-center text-xs uppercase tracking-widest text-ink/50 dark:text-ink-dark/50"
          >
            No Preview
          </div>
          <div
            class="pointer-events-none absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-transparent"
          />
        </button>

        <div class="mt-3 space-y-1">
          <h2 class="text-sm font-semibold leading-snug">{{ item.title }}</h2>
          <div class="flex items-center justify-between text-xs text-ink/60 dark:text-ink-dark/60">
            <p>{{ item.date }}</p>
            <p class="text-right">{{ item.publisher }}</p>
          </div>
        </div>
      </article>
    </div>
  </section>

  <Teleport to="body">
    <div
      v-if="activeItem"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      @click="closePreview"
      @contextmenu.prevent
    >
      <div
        class="relative max-h-[85vh] w-full max-w-5xl overflow-hidden rounded-2xl bg-paper shadow-xl dark:bg-paper-dark"
        @click.stop
        @dragstart.prevent
      >
        <div
          class="flex items-center justify-between border-b border-border/60 px-4 py-3 dark:border-border-dark/60"
        >
          <div class="space-y-0.5">
            <h3 class="text-sm font-semibold">{{ activeItem.title }}</h3>
            <div class="flex items-center gap-2 text-xs text-ink/60 dark:text-ink-dark/60">
              <span>{{ activeItem.date }}</span>
              <span class="text-ink/40 dark:text-ink-dark/40">•</span>
              <span>{{ activeItem.publisher }}</span>
            </div>
          </div>
          <button
            type="button"
            class="rounded-full border border-border/60 px-3 py-1 text-xs hover:bg-accent hover:text-paper transition"
            @click="closePreview"
          >
            Close
          </button>
        </div>
        <div class="max-h-[75vh] overflow-auto bg-black/5 p-4 dark:bg-white/5">
          <img
            v-if="activeItem.preview"
            :src="activeItem.preview"
            :alt="activeItem.title"
            class="mx-auto max-h-[70vh] w-auto select-none"
            draggable="false"
          />
          <div
            v-else
            class="flex h-64 items-center justify-center text-xs uppercase tracking-widest text-ink/50 dark:text-ink-dark/50"
          >
            No Preview
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
