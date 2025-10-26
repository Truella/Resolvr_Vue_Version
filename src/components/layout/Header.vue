<template>
  <header
    class="bg-white shadow-sm sticky top-0 z-50"
    role="banner"
    aria-label="Site Header"
  >
    <div class="max-w-[1440px] mx-auto px-6 py-4 flex items-center justify-between">
      <!-- Logo -->
      <Logo />

      <!-- Desktop / Mobile Navigation -->
      <Nav :is-open="menuOpen" :on-close="closeMenu" />

      <!-- Mobile Toggle Button -->
      <button
        class="md:hidden text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 p-2 rounded"
        @click="toggleMenu"
        :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
        :aria-expanded="menuOpen"
        aria-controls="main-navigation"
      >
        <X v-if="menuOpen" :size="24" />
        <Menu v-else :size="24" />
      </button>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { Menu, X } from 'lucide-vue-next'
import Logo from './Logo.vue'
import Nav from './Nav.vue'

const menuOpen = ref(false)

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const closeMenu = () => {
  menuOpen.value = false
}
</script>
