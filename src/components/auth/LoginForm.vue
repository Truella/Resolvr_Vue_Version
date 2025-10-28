<template>
  <!-- Success State -->
  <div v-if="isSuccess" class="flex flex-col items-center gap-4 text-center">
    <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
      <CheckCircle class="w-8 h-8 text-green-600" />
    </div>
    <div>
      <h3 class="text-xl font-semibold text-gray-800 mb-2">Login Successful!</h3>
      <p class="text-gray-600">Welcome back, {{ user.name }}!</p>
      <p class="text-sm text-gray-500 mt-2">Redirecting to dashboard...</p>
    </div>
    <div class="w-full bg-gray-200 rounded-full h-2">
      <div class="bg-green-600 h-2 rounded-full transition-all duration-2000" :style="{ width: progressWidth + '%' }"></div>
    </div>
  </div>

  <!-- Login Form -->
  <form v-else @submit.prevent="handleSubmit" class="flex flex-col gap-4">
    
    <p v-if="error" class="text-red-600 text-sm">{{ error }}</p>

    <label class="flex flex-col text-sm font-medium text-gray-700">
      Email
      <input
        type="email"
        v-model="formData.email"
        class="border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        required
        :disabled="isLoading"
      />
    </label>

    <label class="flex flex-col text-sm font-medium text-gray-700">
      Password
      <input
        type="password"
        v-model="formData.password"
        class="border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        required
        :disabled="isLoading"
      />
    </label>

    <button
      type="submit"
      class="bg-blue-600 text-white rounded-lg p-2 font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:outline-none transition disabled:opacity-50 disabled:cursor-not-allowed"
      :disabled="isLoading"
    >
      <span v-if="isLoading" class="flex items-center justify-center gap-2">
        <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        Signing In...
      </span>
      <span v-else>Login</span>
    </button>
  </form>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import { CheckCircle } from 'lucide-vue-next'

const router = useRouter()
const authStore = useAuthStore()

const formData = ref({ email: '', password: '' })
const error = ref('')
const isLoading = ref(false)
const isSuccess = ref(false)
const progressWidth = ref(0)
const user = ref({ name: '' })

let progressInterval = null

const handleSubmit = async () => {
  try {
    isLoading.value = true
    error.value = ''
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    authStore.login(formData.value.email, formData.value.password)
    
    // Get user info for welcome message
    user.value = authStore.user
    
    // Show success state
    isSuccess.value = true
    isLoading.value = false
    
    // Start progress bar animation
    startProgressBar()
    
    // Redirect after 2 seconds
    setTimeout(() => {
      router.push('/dashboard')
    }, 2000)
    
  } catch (err) {
    error.value = err.message
    isLoading.value = false
  }
}

const startProgressBar = () => {
  progressWidth.value = 0
  progressInterval = setInterval(() => {
    if (progressWidth.value < 100) {
      progressWidth.value += 5
    } else {
      clearInterval(progressInterval)
    }
  }, 100) // 100ms * 20 = 2000ms total
}

onUnmounted(() => {
  if (progressInterval) {
    clearInterval(progressInterval)
  }
})
</script>

