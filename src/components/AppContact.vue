<script setup></script>

<template>
  <section id="contact" class="w-full p-4 lg:p-8 scroll-mt-24">
    <div class="flex flex-col items-start space-y-1">
      <h2 class="text-xl font-bold">Contact</h2>
      <span class="block w-21 border-b-2 border-accent"></span>
    </div>

    <div
      class="relative mt-4 rounded-xl border border-border bg-paper p-5 shadow-[0_12px_24px_rgba(0,0,0,0.08)] dark:border-border-dark dark:bg-paper-dark dark:shadow-[0_12px_24px_rgba(0,0,0,0.4)]"
    >
      <div class="grid grid-cols-1 gap-6 md:grid-cols-[1.1fr_0.9fr]">
        <div
          class="rounded-lg border border-dashed border-border bg-white/40 p-4 text-xs leading-relaxed dark:border-border-dark dark:bg-black/20 lg:text-sm"
        >
          <p>
            Dear reader,
            <br />
            If you have an idea, a project, or just want to say hello, write me a letter. I read
            every message and reply as soon as I can.
          </p>

          <div class="mt-4 flex flex-wrap gap-2 text-xs lg:text-sm">
            <a
              class="rounded-md bg-accent px-3 py-1.5 text-paper"
              href="mailto:munir63577@gmail.com"
            >
              Send Email
            </a>
            <a
              class="rounded-md border border-border px-3 py-1.5 dark:border-border-dark"
              href="https://github.com/ultramunnn"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <a
              class="rounded-md border border-border px-3 py-1.5 dark:border-border-dark"
              href="https://www.linkedin.com/in/muhammad-shirojul-munir/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <div
          class="relative rounded-lg border border-dashed border-border bg-white/40 p-4 text-xs dark:border-border-dark dark:bg-black/20 lg:text-sm"
        >
          <div class="absolute right-4 top-4">
            <div
              class="grid h-14 w-14 place-items-center border-2 border-accent text-[10px] tracking-[0.2em] text-accent"
            >
              POST
            </div>
          </div>

          <div class="space-y-1 pr-16 leading-relaxed">
            <div class="font-semibold">To:</div>
            <div>Muhammad Shirojul Munir</div>
            <div>Kediri, Indonesia</div>
            <div class="mt-2 text-muted dark:text-muted-dark">munir63577@gmail.com</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
