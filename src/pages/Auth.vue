<template>
  <div :key="route.fullPath">
    <h2 class="text-2xl font-bold text-center text-blue-600 mb-6">
      {{ isLogin ? 'Welcome Back' : 'Create an Account' }}
    </h2>

    <Transition name="fade" mode="out-in">
      <LoginForm v-if="isLogin" key="login" />
      <SignupForm v-else key="signup" />
    </Transition>

    <p class="text-center text-sm text-gray-600 mt-6">
      <template v-if="isLogin">
        Don't have an account?
        <button
          @click="handleToggle"
          class="text-blue-600 hover:underline"
        >
          Sign up
        </button>
      </template>
      <template v-else>
        Already have an account?
        <button
          @click="handleToggle"
          class="text-blue-600 hover:underline"
        >
          Log in
        </button>
      </template>
    </p>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import LoginForm from '../components/auth/LoginForm.vue'
import SignupForm from '../components/auth/SignupForm.vue'

const route = useRoute()
const router = useRouter()
const isLogin = ref(true)

watch(() => route.path, (newPath) => {
  isLogin.value = newPath.includes('signup') ? false : true
}, { immediate: true })

const handleToggle = () => {
  if (isLogin.value) {
    router.push('/auth/signup')
  } else {
    router.push('/auth/login')
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
