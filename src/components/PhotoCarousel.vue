<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps<{
  photos: string[]
  alt?: string
}>()

const current = ref(0)
const total = computed(() => props.photos.length)
const hasMultiple = computed(() => total.value > 1)

const prev = () => {
  current.value = (current.value - 1 + total.value) % total.value
}

const next = () => {
  current.value = (current.value + 1) % total.value
}

const goTo = (index: number) => {
  current.value = index
}

// Calculate 3D transform for each slide
const getSlideStyle = (index: number) => {
  const diff = index - current.value

  // Handle wrap-around for small arrays
  let offset = diff
  if (Math.abs(diff) > total.value / 2) {
    offset = diff > 0 ? diff - total.value : diff + total.value
  }

  const absOffset = Math.abs(offset)

  // Only render slides that are within 2 positions
  if (absOffset > 2) {
    return { display: 'none' }
  }

  const rotateY = offset * -35
  const translateZ = absOffset === 0 ? 0 : absOffset === 1 ? 20 : -30
  const translateX = offset * 55
  const scale = absOffset === 0 ? 1 : absOffset === 1 ? 0.82 : 0.68
  const opacity = absOffset === 0 ? 1 : absOffset === 1 ? 0.7 : 0.4
  const zIndex = 10 - absOffset

  return {
    transform: `translateX(${translateX}%) rotateY(${rotateY}deg) translateZ(${translateZ}px) scale(${scale})`,
    opacity,
    zIndex,
    transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  }
}

// Touch / swipe support
let touchStartX = 0
let touchEndX = 0

const onTouchStart = (e: TouchEvent) => {
  touchStartX = e.changedTouches[0].screenX
}

const onTouchEnd = (e: TouchEvent) => {
  touchEndX = e.changedTouches[0].screenX
  const diff = touchStartX - touchEndX
  if (Math.abs(diff) > 50) {
    diff > 0 ? next() : prev()
  }
}

// Keyboard navigation
const containerRef = ref<HTMLElement | null>(null)

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'ArrowLeft') prev()
  if (e.key === 'ArrowRight') next()
}

onMounted(() => {
  containerRef.value?.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  containerRef.value?.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <div
    ref="containerRef"
    class="carousel-3d group"
    tabindex="0"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <!-- 3D Stage -->
    <div class="carousel-stage">
      <div
        v-for="(photo, i) in photos"
        :key="i"
        class="carousel-slide"
        :class="{ 'is-active': i === current }"
        :style="getSlideStyle(i)"
        @click="i !== current ? goTo(i) : undefined"
      >
        <img
          :src="photo"
          :alt="`${alt ?? 'Project'} - ${i + 1}`"
          class="slide-image"
          loading="lazy"
          draggable="false"
          @contextmenu.prevent
          @dragstart.prevent
        />
      </div>
    </div>

    <!-- Counter badge -->
    <span
      v-if="hasMultiple"
      class="absolute top-2 right-2 z-20 px-2 py-0.5 text-[10px] font-mono bg-paper/80 dark:bg-paper-dark/80 border border-border dark:border-border-dark text-ink dark:text-ink-dark select-none"
    >
      {{ current + 1 }}/{{ total }}
    </span>

    <!-- Nav arrows -->
    <template v-if="hasMultiple">
      <button
        type="button"
        class="nav-arrow left-2"
        @click.stop="prev"
        aria-label="Previous photo"
      >
        ◀
      </button>
      <button
        type="button"
        class="nav-arrow right-2"
        @click.stop="next"
        aria-label="Next photo"
      >
        ▶
      </button>
    </template>

    <!-- Dot indicators -->
    <div
      v-if="hasMultiple"
      class="flex justify-center gap-1.5 mt-3"
    >
      <button
        v-for="(_, i) in photos"
        :key="i"
        type="button"
        class="w-2 h-2 border border-border dark:border-border-dark transition-all duration-300"
        :class="
          i === current
            ? 'bg-accent border-accent scale-125'
            : 'bg-transparent hover:bg-accent/30'
        "
        @click.stop="goTo(i)"
        :aria-label="`Go to photo ${i + 1}`"
      />
    </div>
  </div>
</template>

<style scoped>
.carousel-3d {
  position: relative;
  outline: none;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.carousel-stage {
  position: relative;
  width: 100%;
  perspective: 800px;
  perspective-origin: 50% 50%;
  overflow: hidden;
  border: 1px solid var(--color-border);
  background: var(--color-paper);
}

.dark .carousel-stage {
  border-color: var(--color-border-dark);
  background: var(--color-paper-dark);
}

@media (min-width: 768px) {
  .carousel-stage {
    perspective: 1000px;
  }
}

@media (min-width: 1024px) {
  .carousel-stage {
    perspective: 1200px;
  }
}

.carousel-slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  transform-style: preserve-3d;
  backface-visibility: hidden;
  will-change: transform, opacity;
}

.carousel-slide.is-active {
  position: relative;
  cursor: default;
}

.carousel-slide:not(.is-active) {
  cursor: pointer;
}

.slide-image {
  width: 100%;
  height: auto;
  object-fit: contain;
  user-select: none;
  display: block;
}


/* Nav arrows */
.nav-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 20;
  width: 1.75rem;
  height: 1.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.65rem;
  border: 1px solid var(--color-border);
  background: color-mix(in srgb, var(--color-paper) 80%, transparent);
  color: var(--color-ink);
  opacity: 0;
  transition: opacity 0.2s, background-color 0.2s, color 0.2s, border-color 0.2s;
}

.dark .nav-arrow {
  border-color: var(--color-border-dark);
  background: color-mix(in srgb, var(--color-paper-dark) 80%, transparent);
  color: var(--color-ink-dark);
}

.carousel-3d:hover .nav-arrow {
  opacity: 1;
}

.nav-arrow:hover {
  background: var(--color-accent);
  color: var(--color-paper);
  border-color: var(--color-accent);
}
</style>
