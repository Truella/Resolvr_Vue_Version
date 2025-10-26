import { ref, createApp } from 'vue'
import Toast from '../components/ui/Toast.vue'

const toasts = ref([])

export const useToast = () => {
  const showToast = (type, title, message, duration = 5000) => {
    const toastId = Date.now()
    const toast = {
      id: toastId,
      type,
      title,
      message,
      duration
    }
    
    toasts.value.push(toast)
    
    // Auto remove after duration
    if (duration > 0) {
      setTimeout(() => {
        removeToast(toastId)
      }, duration)
    }
    
    return toastId
  }

  const removeToast = (id) => {
    const index = toasts.value.findIndex(toast => toast.id === id)
    if (index > -1) {
      toasts.value.splice(index, 1)
    }
  }

  const success = (title, message, duration) => {
    return showToast('success', title, message, duration)
  }

  const error = (title, message, duration) => {
    return showToast('error', title, message, duration)
  }

  const warning = (title, message, duration) => {
    return showToast('warning', title, message, duration)
  }

  const info = (title, message, duration) => {
    return showToast('info', title, message, duration)
  }

  return {
    toasts,
    showToast,
    removeToast,
    success,
    error,
    warning,
    info
  }
}
