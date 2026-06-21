<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, reactive } from 'vue'
import * as THREE from 'three'

import goIcon from 'devicon/icons/go/go-original.svg'
import phpIcon from 'devicon/icons/php/php-original.svg'
import laravelIcon from 'devicon/icons/laravel/laravel-original.svg'
import nodejsIcon from 'devicon/icons/nodejs/nodejs-original.svg'
import mysqlIcon from 'devicon/icons/mysql/mysql-original.svg'
import postgresqlIcon from 'devicon/icons/postgresql/postgresql-original.svg'
import reactIcon from 'devicon/icons/react/react-original.svg'
import vuejsIcon from 'devicon/icons/vuejs/vuejs-original.svg'
import html5Icon from 'devicon/icons/html5/html5-original.svg'
import css3Icon from 'devicon/icons/css3/css3-original.svg'
import tailwindcssIcon from 'devicon/icons/tailwindcss/tailwindcss-original.svg'
import javascriptIcon from 'devicon/icons/javascript/javascript-original.svg'
import flutterIcon from 'devicon/icons/flutter/flutter-original.svg'
import gitIcon from 'devicon/icons/git/git-original.svg'
import dockerIcon from 'devicon/icons/docker/docker-original.svg'

const containerRef = ref<HTMLElement | null>(null)

const skills = [
  { name: 'Go', url: goIcon },
  { name: 'PHP', url: phpIcon },
  { name: 'Laravel', url: laravelIcon },
  { name: 'Node.js', url: nodejsIcon },
  { name: 'MySQL', url: mysqlIcon },
  { name: 'PostgreSQL', url: postgresqlIcon },
  { name: 'React', url: reactIcon },
  { name: 'Vue.js', url: vuejsIcon },
  { name: 'HTML5', url: html5Icon },
  { name: 'CSS3', url: css3Icon },
  { name: 'Tailwind', url: tailwindcssIcon },
  { name: 'JavaScript', url: javascriptIcon },
  { name: 'Flutter', url: flutterIcon },
  { name: 'Git', url: gitIcon },
  { name: 'Docker', url: dockerIcon },
]

const labels = reactive<{ name: string; x: number; y: number; visible: boolean }[]>(
  skills.map((s) => ({ name: s.name, x: 0, y: 0, visible: false })),
)

function loadIconTexture(url: string): Promise<THREE.CanvasTexture> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = 128
      canvas.height = 128
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(img, 0, 0, 128, 128)
      const texture = new THREE.CanvasTexture(canvas)
      texture.colorSpace = THREE.SRGBColorSpace
      resolve(texture)
    }
    img.onerror = reject
    img.src = url
  })
}

onMounted(async () => {
  if (!containerRef.value) return
  const container = containerRef.value
  const w = container.clientWidth
  const h = container.clientHeight

  // ── Responsive scaling ──
  const isMobile = w < 640
  const isTablet = w < 1024
  const scaleFactor = isMobile ? 0.55 : isTablet ? 0.75 : 1
  const ringRadius = 4 * scaleFactor
  const iconScale = 0.7 * scaleFactor
  const cameraZ = isMobile ? 14 : isTablet ? 12 : 9
  const starCount = isMobile ? 100 : isTablet ? 200 : 300

  // ── Scene ──
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x0a0a12)

  const camera = new THREE.PerspectiveCamera(40, w / h, 0.7, 2000)
  camera.position.set(0, 3, cameraZ)
  camera.lookAt(0, 0, 0)

  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(w, h)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  container.appendChild(renderer.domElement)

  scene.add(new THREE.AmbientLight(0xffffff, 1.0))

  // ── Star field ──
  const starPos = new Float32Array(starCount * 3)
  for (let i = 0; i < starCount; i++) {
    starPos[i * 3] = (Math.random() - 0.5) * 30
    starPos[i * 3 + 1] = (Math.random() - 0.5) * 20
    starPos[i * 3 + 2] = (Math.random() - 0.5) * 30
  }
  const starGeo = new THREE.BufferGeometry()
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3))
  const starField = new THREE.Points(starGeo, new THREE.PointsMaterial({
    color: 0xf4ecd8, size: 0.04, transparent: true, opacity: 0.6, sizeAttenuation: true,
  }))
  scene.add(starField)

  // ── Nebula clouds ──
  const nebulaColors = [0x8b0000, 0x440022, 0x220044, 0x001144, 0x8b4400]
  const clouds: THREE.Mesh[] = []
  const cloudCount = isMobile ? 3 : 6
  for (let i = 0; i < cloudCount; i++) {
    const geo = new THREE.PlaneGeometry(6 + Math.random() * 4, 6 + Math.random() * 4)
    const mat = new THREE.MeshBasicMaterial({
      color: nebulaColors[i % nebulaColors.length],
      transparent: true, opacity: 0.04, side: THREE.DoubleSide, depthWrite: false,
    })
    const cloud = new THREE.Mesh(geo, mat)
    cloud.position.set((Math.random() - 0.5) * 20, (Math.random() - 0.5) * 10, -8 - Math.random() * 5)
    cloud.rotation.z = Math.random() * Math.PI
    scene.add(cloud)
    clouds.push(cloud)
  }

  // ── Comets ──
  interface Comet { head: THREE.Mesh; tail: THREE.Line; vel: THREE.Vector3; nextTime: number }
  const comets: Comet[] = []
  const cometCount = isMobile ? 2 : 4
  for (let i = 0; i < cometCount; i++) {
    const head = new THREE.Mesh(
      new THREE.SphereGeometry(0.05, 8, 8),
      new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.9 }),
    )
    const glowMesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.12, 8, 8),
      new THREE.MeshBasicMaterial({ color: 0xff6644, transparent: true, opacity: 0.4 }),
    )
    head.add(glowMesh)
    head.position.set((Math.random() - 0.5) * 20, 10 + Math.random() * 5, (Math.random() - 0.5) * 10)

    const tailGeo = new THREE.BufferGeometry()
    tailGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(36), 3))
    const tail = new THREE.Line(tailGeo, new THREE.LineBasicMaterial({
      color: 0xff4422, transparent: true, opacity: 0.5,
    }))
    scene.add(head)
    scene.add(tail)

    const spd = 0.04 + Math.random() * 0.03
    comets.push({
      head, tail,
      vel: new THREE.Vector3(-spd * (0.5 + Math.random() * 0.5), -spd, 0),
      nextTime: Date.now() + i * 3000 + Math.random() * 4000,
    })
  }

  // ── Ring group ──
  const ringGroup = new THREE.Group()
  scene.add(ringGroup)

  // Black hole group — fixed in center, doesn't rotate
  const blackHoleGroup = new THREE.Group()
  blackHoleGroup.position.z = 1
  blackHoleGroup.scale.setScalar(scaleFactor)
  scene.add(blackHoleGroup)

  // Black hole core
  const coreMesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.4, 32, 32),
    new THREE.MeshBasicMaterial({ color: 0x000000 }),
  )
  blackHoleGroup.add(coreMesh)

  // Glow aura
  blackHoleGroup.add(new THREE.Mesh(
    new THREE.SphereGeometry(0.55, 32, 32),
    new THREE.MeshBasicMaterial({ color: 0x8b0000, transparent: true, opacity: 0.15 }),
  ))

  // Accretion disks
  const disk1 = new THREE.Mesh(
    new THREE.TorusGeometry(0.6, 0.06, 16, 64),
    new THREE.MeshBasicMaterial({ color: 0x8b0000, transparent: true, opacity: 0.9 }),
  )
  disk1.rotation.x = Math.PI / 2
  blackHoleGroup.add(disk1)

  const disk2 = new THREE.Mesh(
    new THREE.TorusGeometry(0.85, 0.04, 16, 64),
    new THREE.MeshBasicMaterial({ color: 0xff4444, transparent: true, opacity: 0.5 }),
  )
  disk2.rotation.x = Math.PI / 2
  blackHoleGroup.add(disk2)

  const disk3 = new THREE.Mesh(
    new THREE.TorusGeometry(1.1, 0.03, 16, 64),
    new THREE.MeshBasicMaterial({ color: 0xff8888, transparent: true, opacity: 0.25 }),
  )
  disk3.rotation.x = Math.PI / 2
  blackHoleGroup.add(disk3)

  // Saturn rings
  const saturn1 = new THREE.Mesh(
    new THREE.TorusGeometry(1.5, 0.25, 16, 100),
    new THREE.MeshBasicMaterial({ color: 0xff2200, transparent: true, opacity: 0.12 }),
  )
  saturn1.rotation.x = Math.PI / 2
  blackHoleGroup.add(saturn1)

  const saturn2 = new THREE.Mesh(
    new THREE.TorusGeometry(1.8, 0.15, 16, 100),
    new THREE.MeshBasicMaterial({ color: 0xff4400, transparent: true, opacity: 0.08 }),
  )
  saturn2.rotation.x = Math.PI / 2
  blackHoleGroup.add(saturn2)

  const saturn3 = new THREE.Mesh(
    new THREE.TorusGeometry(2.1, 0.35, 16, 100),
    new THREE.MeshBasicMaterial({ color: 0xff6600, transparent: true, opacity: 0.05 }),
  )
  saturn3.rotation.x = Math.PI / 2
  blackHoleGroup.add(saturn3)

  // ── Icon sprites ──
  const iconSprites: THREE.Sprite[] = []

  const loadPromises = skills.map(async (skill, i) => {
    const angle = (i / skills.length) * Math.PI * 2
    try {
      const texture = await loadIconTexture(skill.url)
      const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true }))
      sprite.scale.set(iconScale, iconScale, 1)
      sprite.position.set(Math.cos(angle) * ringRadius, 0, Math.sin(angle) * ringRadius)
      sprite.userData = { index: i }
      ringGroup.add(sprite)
      iconSprites.push(sprite)
    } catch {
      console.warn(`Failed to load: ${skill.name}`)
    }
  })
  await Promise.all(loadPromises)

  // ── Click effect ──
  const raycaster = new THREE.Raycaster()
  const mouseVec = new THREE.Vector2()
  const clickEffects: { sprite: THREE.Sprite; ring: THREE.Mesh; t0: number }[] = []

  const onClick = (e: PointerEvent) => {
    const rect = container.getBoundingClientRect()
    mouseVec.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
    mouseVec.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
    raycaster.setFromCamera(mouseVec, camera)
    const hits = raycaster.intersectObjects(iconSprites)
    if (hits.length > 0) {
      const sprite = hits[0].object as THREE.Sprite
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(0.3, 0.35, 32),
        new THREE.MeshBasicMaterial({ color: 0xff4444, transparent: true, opacity: 0.8, side: THREE.DoubleSide }),
      )
      ring.position.copy(sprite.position)
      ring.lookAt(camera.position)
      ringGroup.add(ring)
      clickEffects.push({ sprite, ring, t0: Date.now() })
    }
  }
  container.addEventListener('pointerdown', onClick)

  // ── Drag (horizontal) ──
  let dragging = false
  let prevX = 0
  let velX = 0
  const BASE_SPEED = isMobile ? 0.002 : 0.003
  const DRAG_SENS = isMobile ? 0.003 : 0.005
  const DAMPING = 0.95

  container.addEventListener('pointerdown', (e) => { dragging = true; prevX = e.clientX; velX = 0 })
  window.addEventListener('pointermove', (e) => {
    if (!dragging) return
    velX = (e.clientX - prevX) * DRAG_SENS
    prevX = e.clientX
  })
  window.addEventListener('pointerup', () => { dragging = false })

  // ── Mouse parallax ──
  let mX = 0, mY = 0
  const onMouseMove = (e: MouseEvent) => {
    mX = (e.clientX / window.innerWidth - 0.5) * 2
    mY = (e.clientY / window.innerHeight - 0.5) * 2
  }
  window.addEventListener('mousemove', onMouseMove)

  // ── Label projection ──
  const updateLabels = () => {
    const rect = container.getBoundingClientRect()
    iconSprites.forEach((sprite) => {
      const idx = sprite.userData.index as number
      const p = new THREE.Vector3()
      sprite.getWorldPosition(p)
      const proj = p.project(camera)
      labels[idx].x = (proj.x * 0.5 + 0.5) * rect.width
      labels[idx].y = (-proj.y * 0.5 + 0.5) * rect.height
      labels[idx].visible = proj.z < 1
    })
  }

  // ── Resize ──
  const onResize = () => {
    camera.aspect = container.clientWidth / container.clientHeight
    camera.updateProjectionMatrix()
    renderer.setSize(container.clientWidth, container.clientHeight)
  }
  window.addEventListener('resize', onResize)

  // ── Animation loop ──
  let time = 0
  const animate = () => {
    requestAnimationFrame(animate)
    time += 0.01
    const now = Date.now()

    // Ring rotation
    if (!dragging) velX *= DAMPING
    ringGroup.rotation.y += BASE_SPEED + velX

    // Accretion disk spin
    disk1.rotation.z += 0.02
    disk2.rotation.z -= 0.015
    disk3.rotation.z += 0.01

    // Saturn ring spin
    saturn1.rotation.z += 0.003
    saturn2.rotation.z -= 0.002
    saturn3.rotation.z += 0.001

    // Black hole pulse
    const p = 1 + Math.sin(time * 3) * 0.08
    coreMesh.scale.set(p, p, p)

    // Mouse parallax
    camera.position.x += (mX * 0.5 - camera.position.x) * 0.02
    camera.position.y += (3 - mY * 0.3 - camera.position.y) * 0.02
    camera.lookAt(0, 0, 0)

    // Nebula drift
    clouds.forEach((c, i) => {
      c.position.x += Math.sin(time * 0.3 + i * 2) * 0.005
      c.position.y += Math.cos(time * 0.2 + i) * 0.003
      ;(c.material as THREE.MeshBasicMaterial).opacity = 0.03 + Math.sin(time * 0.5 + i) * 0.015
    })

    // Star twinkle
    const sArr = (starField.geometry.attributes.position as THREE.BufferAttribute).array as Float32Array
    for (let i = 0; i < sArr.length; i += 3) sArr[i + 1] += Math.sin(time * 2 + i) * 0.0005
    starField.geometry.attributes.position.needsUpdate = true
    starField.rotation.y += 0.0002

    // Comets
    comets.forEach((c) => {
      if (now < c.nextTime) return
      c.head.position.add(c.vel)
      const tp = (c.tail.geometry.attributes.position as THREE.BufferAttribute).array as Float32Array
      for (let i = tp.length - 3; i >= 3; i -= 3) { tp[i] = tp[i - 3]; tp[i + 1] = tp[i - 2]; tp[i + 2] = tp[i - 1] }
      tp[0] = c.head.position.x; tp[1] = c.head.position.y; tp[2] = c.head.position.z
      c.tail.geometry.attributes.position.needsUpdate = true
      if (c.head.position.y < -10) {
        c.head.position.set((Math.random() - 0.5) * 20, 10 + Math.random() * 5, (Math.random() - 0.5) * 10)
        const s = 0.04 + Math.random() * 0.03
        c.vel.set(-s * (0.5 + Math.random() * 0.5), -s, 0)
        tp.fill(0)
        c.tail.geometry.attributes.position.needsUpdate = true
        c.nextTime = now + 2000 + Math.random() * 5000
      }
    })

    // Click effects
    for (let i = clickEffects.length - 1; i >= 0; i--) {
      const e = clickEffects[i]
      const elapsed = (now - e.t0) / 1000
      if (elapsed > 0.8) {
        ringGroup.remove(e.ring)
        e.ring.geometry.dispose()
        ;(e.ring.material as THREE.Material).dispose()
        clickEffects.splice(i, 1)
        continue
      }
      const prog = elapsed / 0.8
      const s = 1 + prog * 3
      e.ring.scale.set(s, s, s)
      ;(e.ring.material as THREE.MeshBasicMaterial).opacity = 0.8 * (1 - prog)
      const bounce = 1 + Math.sin(elapsed * Math.PI * 2.5) * 0.3 * (1 - prog)
      e.sprite.scale.set(bounce, bounce, bounce)
    }

    updateLabels()
    renderer.render(scene, camera)
  }
  animate()

  // ── Cleanup ──
  onBeforeUnmount(() => {
    window.removeEventListener('resize', onResize)
    window.removeEventListener('mousemove', onMouseMove)
    renderer.dispose()
  })
})
</script>

<template>
  <div
    ref="containerRef"
    class="relative w-full h-64 sm:h-80 md:h-96 cursor-grab active:cursor-grabbing select-none overflow-hidden"
  >
    <span
      v-for="(label, i) in labels"
      :key="i"
      class="absolute text-[10px] font-mono text-ink-dark pointer-events-none whitespace-nowrap transition-opacity duration-200 hidden sm:block"
      :style="{
        left: label.x + 'px',
        top: label.y + 'px',
        transform: 'translate(-50%, 24px)',
        opacity: label.visible ? 0.8 : 0,
      }"
    >
      {{ label.name }}
    </span>
  </div>
</template>
