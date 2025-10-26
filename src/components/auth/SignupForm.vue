<template>
  <!-- Success State -->
  <div v-if="isSuccess" class="flex flex-col items-center gap-4 text-center">
    <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
      <CheckCircle class="w-8 h-8 text-green-600" />
    </div>
    <div>
      <h3 class="text-xl font-semibold text-gray-800 mb-2">Account Created Successfully!</h3>
      <p class="text-gray-600">Welcome to TicketFlow, {{ formData.name }}!</p>
      <p class="text-sm text-gray-500 mt-2">Redirecting to login page...</p>
    </div>
    <div class="w-full bg-gray-200 rounded-full h-2">
      <div class="bg-green-600 h-2 rounded-full transition-all duration-3000" :style="{ width: progressWidth + '%' }"></div>
    </div>
  </div>

  <!-- Signup Form -->
  <form v-else @submit.prevent="handleSubmit" class="flex flex-col gap-4">
    <p v-if="error" class="text-red-600 text-sm">{{ error }}</p>

    <label class="flex flex-col text-sm font-medium text-gray-700">
      Email
      <input
        type="email"
        v-model="formData.email"
        class="border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        required
        placeholder="youremail@example.com"
        :disabled="isLoading"
      />
    </label>

    <label class="flex flex-col text-sm font-medium text-gray-700">
      Name
      <input
        type="text"
        v-model="formData.name"
        class="border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        required
        placeholder="Enter Full Name"
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
        placeholder="Enter Password"
        :disabled="isLoading"
      />
    </label>

    <label class="flex flex-col text-sm font-medium text-gray-700">
      Confirm Password
      <input
        type="password"
        v-model="formData.confirmPassword"
        class="border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        required
        placeholder="Confirm Password"
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
        Creating Account...
      </span>
      <span v-else>Sign Up</span>
    </button>
  </form>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import { CheckCircle } from 'lucide-vue-next'

const router = useRouter()
const authStore = useAuthStore()

const formData = ref({ 
  email: '', 
  password: '', 
  confirmPassword: '', 
  name: '' 
})
const error = ref('')
const isLoading = ref(false)
const isSuccess = ref(false)
const progressWidth = ref(0)

let progressInterval = null

const handleSubmit = async () => {
  try {
    isLoading.value = true
    error.value = ''
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    authStore.signup(formData.value)
    
    // Show success state
    isSuccess.value = true
    isLoading.value = false
    
    // Start progress bar animation
    startProgressBar()
    
    // Redirect after 3 seconds
    setTimeout(() => {
      router.push('/auth/login')
    }, 3000)
    
  } catch (err) {
    error.value = err.message
    isLoading.value = false
  }
}

const startProgressBar = () => {
  progressWidth.value = 0
  progressInterval = setInterval(() => {
    if (progressWidth.value < 100) {
      progressWidth.value += 2
    } else {
      clearInterval(progressInterval)
    }
  }, 60) // 60ms * 50 = 3000ms total
}

onUnmounted(() => {
  if (progressInterval) {
    clearInterval(progressInterval)
  }
})
</script>
