<template>
  <section id="skillset" class="w-full p-4 lg:p-8 scroll-mt-24">
    <div class="flex flex-col items-start space-y-1">
      <h2 class="text-xl font-bold">Skillset</h2>
      <span class="block w-20 border-b-2 border-accent"></span>
    </div>

    <div class="mt-4 text-xs font-mono text-green-600">HTTP/1.1 200 OK — GET /api/skillset</div>

    <pre
      class="mt-2 p-4 border border-border bg-paper dark:bg-paper-dark text-xs lg:text-sm font-mono overflow-x-auto"
    >
{
  "data": {
    "backend": {
      "languages": ["PHP", "Go"],
      "frameworks": ["Laravel", "Gin"],
      "database": ["MySQL", "PostgreSQL"],
      "auth": ["JWT", "Session-based"],
      "architecture": ["REST API", "MVC", "Clean Architecture"]
    },
    "mobile": {
      "framework": ["Flutter"],
      "state_management": ["Provider", "Riverpod"],
      "api_consumption": ["REST"],
      "platform": ["Android"]
    },
    "frontend_interface": {
    "frameworks": ["Vue.js", "React"],
    "languages": ["HTML", "CSS", "JavaScript"],
    "usage": "Consumed backend APIs and built internal dashboards"
  },
    "tooling": {
      "version_control": ["Git", "GitHub"],
      "container": ["Docker (basic)"],
      "others": ["Postman", "Linux CLI"]
    }
  }
}
</pre
    >

    <p class="mt-2 text-xs text-muted">
      A response format inspired by the backend API interactions I work with daily.
    </p>
  </section>
</template>
