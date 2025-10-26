<template>
  <div v-if="isOpen" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" @click="closeModal">
    <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white" @click.stop>
      <div class="mt-3">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900">
            {{ isEditing ? 'Edit Ticket' : 'Create New Ticket' }}
          </h3>
          <button
            @click="closeModal"
            class="text-gray-400 hover:text-gray-600"
          >
            <X class="w-6 h-6" />
          </button>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <!-- Title Field -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Title <span class="text-red-500">*</span>
            </label>
            <input
              v-model="formData.title"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              :class="{ 'border-red-500': errors.title }"
              placeholder="Enter ticket title"
            />
            <p v-if="errors.title" class="mt-1 text-sm text-red-600">
              {{ errors.title }}
            </p>
          </div>

          <!-- Description Field -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              v-model="formData.description"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              :class="{ 'border-red-500': errors.description }"
              placeholder="Enter ticket description"
            ></textarea>
            <p v-if="errors.description" class="mt-1 text-sm text-red-600">
              {{ errors.description }}
            </p>
          </div>

          <!-- Status Field -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Status <span class="text-red-500">*</span>
            </label>
            <select
              v-model="formData.status"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              :class="{ 'border-red-500': errors.status }"
            >
              <option value="">Select status</option>
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>
            <p v-if="errors.status" class="mt-1 text-sm text-red-600">
              {{ errors.status }}
            </p>
          </div>

          <!-- Priority Field -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <select
              v-model="formData.priority"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <!-- Error Message -->
          <div v-if="error" class="p-3 bg-red-50 border border-red-200 rounded-md">
            <p class="text-sm text-red-600">{{ error }}</p>
          </div>

          <!-- Action Buttons -->
          <div class="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              @click="closeModal"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="loading"
              class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="loading" class="flex items-center">
                <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                {{ isEditing ? 'Updating...' : 'Creating...' }}
              </span>
              <span v-else>{{ isEditing ? 'Update Ticket' : 'Create Ticket' }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import { X } from 'lucide-vue-next'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  ticket: {
    type: Object,
    default: null
  },
  isEditing: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'submit'])

const formData = reactive({
  title: '',
  description: '',
  status: '',
  priority: 'medium'
})

const errors = reactive({
  title: '',
  description: '',
  status: ''
})

const error = ref('')
const loading = ref(false)

// Watch for ticket changes when editing
watch(() => props.ticket, (newTicket) => {
  if (newTicket && props.isEditing) {
    formData.title = newTicket.title || ''
    formData.description = newTicket.description || ''
    formData.status = newTicket.status || ''
    formData.priority = newTicket.priority || 'medium'
  }
}, { immediate: true })


// Reset form when modal opens
watch(() => props.isOpen, (isOpen) => {
  if (isOpen && !props.isEditing) {
    resetForm()
  }
})

const resetForm = () => {
  formData.title = ''
  formData.description = ''
  formData.status = ''
  formData.priority = 'medium'
  clearErrors()
}

const clearErrors = () => {
  errors.title = ''
  errors.description = ''
  errors.status = ''
  error.value = ''
}

const validateForm = () => {
  clearErrors()
  let isValid = true

  // Title validation
  if (!formData.title || formData.title.trim() === '') {
    errors.title = 'Title is required'
    isValid = false
  } else if (formData.title.trim().length < 3) {
    errors.title = 'Title must be at least 3 characters long'
    isValid = false
  }

  // Description validation (optional but if provided, validate length)
  if (formData.description && formData.description.trim().length > 500) {
    errors.description = 'Description must be less than 500 characters'
    isValid = false
  }

  // Status validation
  if (!formData.status) {
    errors.status = 'Status is required'
    isValid = false
  } else if (!['open', 'in_progress', 'closed'].includes(formData.status)) {
    errors.status = 'Status must be one of: open, in_progress, closed'
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }

  try {
    loading.value = true
    error.value = ''

    const ticketData = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      status: formData.status,
      priority: formData.priority
    }

    emit('submit', ticketData)
  } catch (err) {
    error.value = err.message || 'An error occurred'
  } finally {
    loading.value = false
  }
}

const closeModal = () => {
  resetForm()
  emit('close')
}
</script>
