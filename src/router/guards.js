import { useAuthStore } from '../stores/auth'

export const authGuard = (to, from, next) => {
  const authStore = useAuthStore()
  
  if (authStore.isAuthenticated) {
    next()
  } else {
    // Redirect to login with return URL
    next({
      path: '/auth/login',
      query: { redirect: to.fullPath }
    })
  }
}

export const guestGuard = (to, from, next) => {
  const authStore = useAuthStore()
  
  if (authStore.isAuthenticated) {
    // Redirect authenticated users to dashboard
    next('/dashboard')
  } else {
    next()
  }
}
