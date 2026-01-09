import { ref, watch } from 'vue'

const storageKey = 'theme'

const resolveInitialTheme = () => {
  const saved = localStorage.getItem(storageKey)
  if (saved === 'dark' || saved === 'light') {
    return saved
  }
  return 'light'
}

const applyTheme = (dark) => {
  document.documentElement.classList.toggle('dark', dark)
}

const isDark = ref(false)
const initialTheme = resolveInitialTheme()
isDark.value = initialTheme === 'dark'
applyTheme(isDark.value)
localStorage.setItem(storageKey, initialTheme)

export function useDarkMode() {
  watch(isDark, (val) => {
    applyTheme(val)
    localStorage.setItem(storageKey, val ? 'dark' : 'light')
  })

  const toggleDarkMode = () => {
    isDark.value = !isDark.value
  }

  return { isDark, toggleDarkMode }
}
