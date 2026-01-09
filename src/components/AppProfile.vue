<script setup></script>

<template>
  <section id="profile" class="w-full min-h-max p-4 lg:p-8 scroll-mt-20">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div class="lg:pr-12 max-w-prose">
        <div class="flex flex-col items-start space-y-1">
          <h1 class="text-xl font-bold">Profile</h1>
          <span class="block w-18 border-b-2 border-accent"></span>
        </div>

        <p class="mt-4 text-xs lg:text-sm text-justify leading-relaxed">
          I focus on backend system development and mobile application engineering. My work revolves
          around building structured APIs, managing data flow, and developing mobile applications
          with clear logic and maintainable code. Currently, I work primarily with backend
          technologies such as Laravel and Go, alongside mobile development using Flutter, while
          continuing to refine my understanding of software architecture and system design.
        </p>
        <p class="mt-4 text-xs lg:text-sm italic text-muted leading-relaxed">
          Keywords: Backend Development · Mobile App · Laravel · Go · Flutter · API · System Design
          · Student Developer · Continuous Learning
        </p>
      </div>

      <div class="flex justify-center lg:justify-center lg:ml-16">
        <figure class="border border-border p-3">
          <img src="/src/assets/images/profile.jpeg" alt="Profile Photo" class="w-48 grayscale" />
          <figcaption class="mt-2 text-xs text-muted text-center">Personal Archive</figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>
