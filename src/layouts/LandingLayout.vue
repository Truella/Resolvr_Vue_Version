<template>
  <div class="layout-wrapper min-h-screen flex flex-col">
    <Header />
    <main class="flex-1 bg-gray-50">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from '../components/layout/Header.vue'
import Footer from '../components/layout/Footer.vue'

</script>
