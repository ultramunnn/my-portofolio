<script setup>
const year = new Date().getFullYear()
</script>

<template>
  <footer
    class="w-full border-t border-border bg-paper px-4 py-8 dark:border-border-dark dark:bg-paper-dark lg:px-8"
  >
    <div class="mx-auto flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div>
        <div class="text-xs uppercase tracking-[0.2em] text-muted dark:text-muted-dark">Signed</div>
        <img
          src="@/assets/images/tandatangan.png"
          alt="Signature"
          class="mt-2 w-40 opacity-80 mix-blend-multiply dark:hidden"
        />
        <img
          src="@/assets/images/tandatangandarkmode.png"
          alt="Signature dark"
          class="mt-2 hidden w-40 opacity-80 mix-blend-screen dark:block"
        />
        <div class="text-sm font-semibold tracking-wide">Muhammad Shirojul Munir</div>
        <div class="text-sm font-[courier] text-ink dark:text-ink-dark">Backend dev, Mobile dev</div>
      </div>

      <div class="md:text-right md:self-end">
        <div class="text-xs uppercase tracking-[0.2em] text-muted dark:text-muted-dark">Motto</div>
        <div class="mt-2 text-sm text-ink dark:text-ink-dark">
          Build slow. Ship right. Learn always.
        </div>
        <div class="mt-2 text-xs text-muted dark:text-muted-dark">© {{ year }}</div>
      </div>
    </div>
  </footer>
</template>
