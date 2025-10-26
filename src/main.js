import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './main.css'
import ToastContainer from './components/ui/ToastContainer.vue'
import { authGuard, guestGuard } from './router/guards'

// Import pages
import LandingPage from './pages/LandingPage.vue'
import Auth from './pages/Auth.vue'
import Dashboard from './pages/Dashboard.vue'
import Tickets from './pages/Tickets.vue'

// Import layouts
import LandingLayout from './layouts/LandingLayout.vue'
import AuthLayout from './layouts/AuthLayout.vue'
import DashboardLayout from './layouts/DashboardLayout.vue'

// Router configuration
const routes = [
  {
    path: '/',
    component: LandingLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: LandingPage
      }
    ]
  },
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        name: 'login',
        component: Auth
      },
      {
        path: 'signup',
        name: 'signup',
        component: Auth
      }
    ]
  },
  {
    path: '/dashboard',
    component: DashboardLayout,
    children: [
      {
        path: '',
        name: 'dashboard',
        component: Dashboard
      },
      {
        path: 'tickets',
        name: 'tickets',
        component: Tickets
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Add route guards
router.beforeEach((to, from, next) => {
  // Check if route requires authentication
  if (to.path.startsWith('/dashboard')) {
    authGuard(to, from, next)
  } else if (to.path.startsWith('/auth')) {
    guestGuard(to, from, next)
  } else {
    next()
  }
})


const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)

// Add toast container
app.component('ToastContainer', ToastContainer)

app.mount('#app')
