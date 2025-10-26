<template>
  <section
    id="about"
    class="relative bg-white py-20 px-6 overflow-hidden min-h-[400px]"
    aria-labelledby="about-heading"
  >
    <!-- Decorative circle (bottom-right) -->
    <div
      class="absolute bottom-10 right-10 w-32 h-32 bg-blue-200 rounded-full blur-3xl opacity-40"
      aria-hidden="true"
    ></div>

    <div class="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <!-- Left side - Image or illustration -->
      <div class="flex justify-center">
        image here
      </div>

      <!-- Right side - Text content -->
      <div>
        <h2
          id="about-heading"
          class="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
        >
          About TicketFlow
        </h2>

        <p class="text-gray-600 leading-relaxed mb-6">
          TicketFlow is your all-in-one platform for managing tickets, tasks,
          and support requests with ease. Whether you're a small team or a
          growing company, TicketFlow helps you stay organized, resolve issues
          faster, and track progress effortlessly — all from one dashboard.
        </p>

        <p class="text-gray-600 leading-relaxed">
          Built with simplicity and performance in mind, our goal is to make
          ticket management intuitive and enjoyable. Stay focused on what
          matters — we'll handle the workflow.
        </p>

        <button
          @click="navigateToSignup"
          class="mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
        >
          Get Started
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateToSignup = () => {
  router.push('/auth/signup')
}
</script>
