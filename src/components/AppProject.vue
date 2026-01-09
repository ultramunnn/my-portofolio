<template>
  <section id="project" class="w-full p-4 lg:p-8 scroll-mt-24">
    <div class="flex flex-col items-start space-y-1">
      <h2 class="text-xl font-bold">Projects</h2>
      <span class="block w-21 border-b-2 border-accent"></span>
    </div>

    <div class="mt-4 text-xs font-mono text-green-600">
      HTTP/1.1 200 OK — GET /api/projects/backend
    </div>

    <pre
      class="mt-2 p-3 border border-border bg-paper dark:bg-paper-dark text-xs lg:text-sm font-mono overflow-x-auto"
    >
[
  {
    "name": "EyesonYourIdealPlate",
    "stack": ["Python", "ONNX", "ESP32-S3", "MySQL"],
    "notes": "AI-based food anomaly detection with IoT camera input and monitoring dashboard"
  },
  {
    "name": "Notes API",
    "stack": ["Golang", "MySQL", "Docker"],
    "notes": "Lightweight CRUD API with clean endpoint structure and containerized deployment"
  },
  {
    "name": "HematBox",
    "stack": ["Golang", "Laravel", "Vue.js", "MySQL"],
    "notes": "Backend services for authentication, posting, and real-time reservation flow"
  }
]
</pre
    >

    <div class="mt-4 text-xs font-mono text-green-600">
      HTTP/1.1 200 OK — GET /api/projects/mobile
    </div>

    <pre
      class="mt-2 p-3 border border-border bg-paper dark:bg-paper-dark text-xs lg:text-sm font-mono overflow-x-auto"
    >
[
  {
    "name": "Kalkulatorku",
    "stack": ["Flutter"],
    "notes": "Android calculator application with clean logic separation and published-ready build"
  },
  {
    "name": "CooklyApp",
    "stack": ["Flutter", "Supabase"],
    "notes": "Recipes application with CRUD operations and backend-as-a-service integration"
  }
]
</pre
    >

    <p class="mt-2 text-xs text-muted">Project records documented in API-style format.</p>
  </section>
</template>
