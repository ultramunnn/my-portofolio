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
          I am an Information Technology student at Universitas Brawijaya with a strong interest in
          backend development and creating innovative technology solutions. I have experience
          building RESTful APIs, managing databases, and implementing authentication and
          authorization using modern backend technologies such as Laravel, Node.js, and Go. I am
          continuously improving my skills in software architecture, clean code, and system design.
          I have experience in web development, various campus projects, and competition projects,
          and I am accustomed to working both collaboratively and adaptively.
        </p>
        <p class="mt-4 text-xs lg:text-sm italic text-muted leading-relaxed">
          Keywords: Backend Development · Software Engineering · RESTful API · Laravel · Node.js · Go · Database Management
          · System Design · Clean Code · Student Developer
        </p>
        <a
          class="mt-4 inline-flex items-center rounded-md border border-accent px-3 py-2 text-xs text-accent  transition-colors hover:bg-accent hover:text-paper dark:text-paper dark:hover:bg-accent dark:hover:text-paper"
          href="https://drive.google.com/file/d/1bAZGNdZiYQuEqiC0T7NStuQIc1RMy776/view?usp=sharing"
          target="_blank"
          rel="noreferrer"
        >
          Open CV
        </a>
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
