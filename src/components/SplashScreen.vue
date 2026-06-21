<script setup lang="ts">
import { onMounted, ref } from 'vue'
import gsap from 'gsap'

const emit = defineEmits<{ done: [] }>()
const splashRef = ref<HTMLElement | null>(null)
const titleRef = ref<HTMLElement | null>(null)
const subtitleRef = ref<HTMLElement | null>(null)
const loaderRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!splashRef.value || !titleRef.value) return

  const letters = titleRef.value.querySelectorAll('.letter')
  const subtitle = subtitleRef.value
  const loader = loaderRef.value

  const tl = gsap.timeline({
    onComplete: () => {
      // Fade out splash
      gsap.to(splashRef.value, {
        opacity: 0,
        scale: 1.1,
        duration: 0.8,
        ease: 'power2.in',
        onComplete: () => emit('done'),
      })
    },
  })

  // Stars zoom in
  tl.from('.splash-star', {
    scale: 0,
    opacity: 0,
    duration: 0.6,
    stagger: { amount: 1, from: 'random' },
    ease: 'back.out(2)',
  })

  // Title letters fall in one by one
  tl.from(letters, {
    y: -80,
    opacity: 0,
    scale: 2,
    rotateZ: () => gsap.utils.random(-30, 30),
    duration: 0.6,
    stagger: 0.08,
    ease: 'back.out(1.5)',
  }, '-=0.3')

  // Title glow pulse
  tl.to(letters, {
    textShadow: '0 0 20px #ff4444, 0 0 40px #8b0000, 0 0 60px #8b0000',
    color: '#ff6644',
    duration: 0.4,
    stagger: 0.05,
    ease: 'power2.out',
  })

  // Subtitle fade in
  tl.from(subtitle, {
    y: 20,
    opacity: 0,
    duration: 0.6,
    ease: 'power2.out',
  }, '-=0.2')

  // Loader bar
  tl.from(loader, {
    scaleX: 0,
    duration: 1.5,
    ease: 'power1.inOut',
  }, '-=0.4')

  // Final pulse
  tl.to(splashRef.value, {
    scale: 1.02,
    duration: 0.15,
    yoyo: true,
    repeat: 1,
    ease: 'power2.inOut',
  })
})
</script>

<template>
  <div ref="splashRef" class="splash-screen">
    <!-- Stars -->
    <div v-for="i in 60" :key="i" class="splash-star" :style="{
      left: Math.random() * 100 + '%',
      top: Math.random() * 100 + '%',
      width: (Math.random() * 3 + 1) + 'px',
      height: (Math.random() * 3 + 1) + 'px',
      animationDelay: Math.random() * 3 + 's',
    }" />

    <!-- Shooting stars -->
    <div class="shooting-star s1" />
    <div class="shooting-star s2" />
    <div class="shooting-star s3" />

    <!-- Content -->
    <div class="splash-content">
      <!-- Planet decoration -->
      <div class="planet">
        <div class="planet-ring" />
      </div>

      <!-- Title -->
      <h1 ref="titleRef" class="splash-title">
        <span v-for="(ch, i) in 'ULTRAMUNNN'.split('')" :key="i" class="letter">{{ ch }}</span>
      </h1>

      <!-- Subtitle -->
      <p ref="subtitleRef" class="splash-subtitle">Welcome to My Portofolio</p>

      <!-- Loader -->
      <div class="loader-track">
        <div ref="loaderRef" class="loader-bar" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.splash-screen {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: radial-gradient(ellipse at center, #0d0d1a 0%, #050510 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

/* Stars */
.splash-star {
  position: absolute;
  background: #f4ecd8;
  border-radius: 50%;
  animation: twinkle 2s ease-in-out infinite alternate;
}

@keyframes twinkle {
  0% { opacity: 0.3; }
  100% { opacity: 1; }
}

/* Shooting stars */
.shooting-star {
  position: absolute;
  width: 80px;
  height: 2px;
  background: linear-gradient(90deg, #ff4444, transparent);
  border-radius: 1px;
  animation: shoot 3s linear infinite;
  opacity: 0;
}

.shooting-star::before {
  content: '';
  position: absolute;
  left: 0;
  top: -2px;
  width: 6px;
  height: 6px;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 0 10px #ff6644, 0 0 20px #ff4444;
}

.s1 { top: 15%; left: -100px; animation-delay: 0s; }
.s2 { top: 35%; left: -100px; animation-delay: 1.5s; }
.s3 { top: 60%; left: -100px; animation-delay: 0.8s; }

@keyframes shoot {
  0% { transform: translateX(0) translateY(0) rotate(-15deg); opacity: 0; }
  5% { opacity: 1; }
  70% { opacity: 1; }
  100% { transform: translateX(120vw) translateY(30vh) rotate(-15deg); opacity: 0; }
}

/* Content */
.splash-content {
  text-align: center;
  position: relative;
  z-index: 10;
}

/* Planet */
.planet {
  width: 60px;
  height: 60px;
  margin: 0 auto 2rem;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #8b0000, #3a0000);
  box-shadow: 0 0 30px rgba(139, 0, 0, 0.6), inset -8px -4px 12px rgba(0, 0, 0, 0.5);
  position: relative;
  animation: float 4s ease-in-out infinite;
}

.planet-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100px;
  height: 20px;
  border: 2px solid rgba(255, 68, 68, 0.4);
  border-radius: 50%;
  transform: translate(-50%, -50%) rotateX(70deg);
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

/* Title */
.splash-title {
  font-family: 'Libre Baskerville', serif;
  font-size: clamp(2rem, 8vw, 5rem);
  font-weight: bold;
  color: #f4ecd8;
  letter-spacing: 0.3em;
  margin: 0;
  line-height: 1.2;
}

.letter {
  display: inline-block;
  text-shadow: 0 0 10px rgba(244, 236, 216, 0.3);
}

/* Subtitle */
.splash-subtitle {
  font-family: 'Libre Baskerville', serif;
  font-size: clamp(0.7rem, 2vw, 1rem);
  color: rgba(244, 236, 216, 0.5);
  letter-spacing: 0.5em;
  text-transform: uppercase;
  margin-top: 1rem;
}

/* Loader */
.loader-track {
  width: 200px;
  height: 2px;
  background: rgba(244, 236, 216, 0.1);
  margin: 2rem auto 0;
  border-radius: 1px;
  overflow: hidden;
}

.loader-bar {
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #8b0000, #ff4444, #8b0000);
  transform-origin: left;
  border-radius: 1px;
}
</style>
