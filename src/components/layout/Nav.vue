<template>
  <nav
    :class="[
      isOpen
        ? 'flex flex-col items-center absolute top-16 left-0 w-full bg-white shadow-md py-6 z-50'
        : 'hidden md:flex'
    ]"
    class="md:static md:bg-transparent md:flex-row md:shadow-none md:py-0"
    aria-label="Main Navigation"
  >
    <ul class="flex flex-col md:flex-row gap-6 md:gap-8 text-gray-700 font-medium text-base">
      <li>
        <a
          href="#features"
          @click="onClose"
          class="hover:text-blue-600 focus:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
        >
          Features
        </a>
      </li>
      <li>
        <a
          href="#about"
          @click="onClose"
          class="hover:text-blue-600 focus:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
        >
          About
        </a>
      </li>

      <!-- Auth Routes -->
      <li>
        <router-link
          to="/auth/login"
          @click="onClose"
          class="hover:text-blue-600 focus:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
        >
          Login
        </router-link>
      </li>
      <li>
        <router-link
          to="/auth/signup"
          @click="onClose"
          class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 transition"
        >
          Get Started
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup>
defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  onClose: {
    type: Function,
    required: true
  }
})
</script>
