<template>
  <footer class="bg-gray-100 text-gray-700 mt-16 border-t border-gray-200">
    <div class="max-w-[1440px] mx-auto px-6 py-10 flex flex-col items-center text-center md:text-left md:flex-row md:justify-between">
      <!-- Logo / App Name -->
      <h3 class="text-2xl font-semibold text-blue-600 mb-4 md:mb-0">
        TicketFlow
      </h3>

      <!-- Navigation Links -->
      <ul class="flex flex-wrap justify-center gap-6 mb-4 md:mb-0">
        <li>
          <a href="#features" class="hover:text-blue-600 transition">
            Features
          </a>
        </li>
        <li>
          <a href="#about" class="hover:text-blue-600 transition">
            About
          </a>
        </li>
        <li>
          <a href="/auth/login" class="hover:text-blue-600 transition">
            Login
          </a>
        </li>
        <li>
          <a href="/auth/signup" class="hover:text-blue-600 transition">
            Get Started
          </a>
        </li>
      </ul>

      <!-- Social Icons + Copyright -->
      <div class="flex flex-col items-center gap-4 md:items-end">
        <div class="flex gap-5">
          <a
            href="#"
            aria-label="Visit our GitHub"
            class="text-gray-500 hover:text-blue-600 transition"
          >
            <Github :size="20" :stroke-width="1.5" />
          </a>
          <a
            href="#"
            aria-label="Visit our Twitter"
            class="text-gray-500 hover:text-blue-600 transition"
          >
            <Twitter :size="20" :stroke-width="1.5" />
          </a>
          <a
            href="#"
            aria-label="Visit our LinkedIn"
            class="text-gray-500 hover:text-blue-600 transition"
          >
            <Linkedin :size="20" :stroke-width="1.5" />
          </a>
        </div>

        <p class="text-sm text-gray-500">
          © {{ currentYear }} TicketFlow. All Rights Reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { Github, Twitter, Linkedin } from 'lucide-vue-next'

const currentYear = computed(() => new Date().getFullYear())
</script>
