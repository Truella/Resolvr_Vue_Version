<template>
  <section
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 relative overflow-hidden"
    aria-label="Authentication page layout"
  >
    <!-- Decorative circles -->
   <div
				class="absolute top-10 left-10 w-40 h-40 bg-blue-200 rounded-full opacity-70"
				aria-hidden="true"
			></div>
			<div
				class="absolute bottom-10 right-10 w-32 h-32 bg-blue-300 rounded-full opacity-70"
				aria-hidden="true"
			></div>

    <!-- Auth Form Container -->
    <div class="relative z-10 w-[90vw] max-w-md bg-white shadow-lg rounded-2xl px-8 py-10 md:px-10">
      <router-link
    :to="{ name: 'home' }"
    class="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600 transition mb-4"
  >
    <svg
      class="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M15 19l-7-7 7-7"
      ></path>
    </svg>
    Back to Home
  </router-link>          
      <router-view />
    </div>
  </section>
</template>

<script setup>
// AuthLayout component
</script>
