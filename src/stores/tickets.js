import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useTicketsStore = defineStore('tickets', () => {
  const tickets = ref([])
  const loading = ref(false)
  const error = ref('')

  // Computed properties
  const totalTickets = computed(() => tickets.value.length)
  const openTickets = computed(() => tickets.value.filter(ticket => ticket.status === 'open').length)
  const inProgressTickets = computed(() => tickets.value.filter(ticket => ticket.status === 'in_progress').length)
  const closedTickets = computed(() => tickets.value.filter(ticket => ticket.status === 'closed').length)

  // Load tickets from localStorage
  const loadTickets = () => {
    try {
      const storedTickets = localStorage.getItem('ticketapp_tickets')
      if (storedTickets) {
        tickets.value = JSON.parse(storedTickets)
      } else {
        // Initialize with sample data
        const sampleTickets = [
          {
            id: 1,
            title: "Login Issue",
            description: "Unable to login with correct credentials",
            status: "open",
            priority: "high",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: 2,
            title: "Feature Request",
            description: "Add dark mode support",
            status: "in_progress",
            priority: "medium",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: 3,
            title: "Bug Report",
            description: "Dashboard not loading properly",
            status: "closed",
            priority: "high",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        ]
        tickets.value = sampleTickets
        saveTickets()
      }
    } catch (err) {
      error.value = 'Failed to load tickets'
      console.error('Error loading tickets:', err)
    }
  }

  // Save tickets to localStorage
  const saveTickets = () => {
    try {
      localStorage.setItem('ticketapp_tickets', JSON.stringify(tickets.value))
    } catch (err) {
      error.value = 'Failed to save tickets'
      console.error('Error saving tickets:', err)
    }
  }

  // Create new ticket
  const createTicket = (ticketData) => {
    return new Promise((resolve, reject) => {
      try {
        loading.value = true
        error.value = ''

        // Validation
        if (!ticketData.title || ticketData.title.trim() === '') {
          throw new Error('Title is required')
        }

        if (!ticketData.status || !['open', 'in_progress', 'closed'].includes(ticketData.status)) {
          throw new Error('Status must be one of: open, in_progress, closed')
        }

        // Create new ticket
        const newTicket = {
          id: Date.now(), // Simple ID generation
          title: ticketData.title.trim(),
          description: ticketData.description?.trim() || '',
          status: ticketData.status,
          priority: ticketData.priority || 'medium',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }

        tickets.value.unshift(newTicket) // Add to beginning
        saveTickets()
        
        loading.value = false
        resolve(newTicket)
      } catch (err) {
        loading.value = false
        error.value = err.message
        reject(err)
      }
    })
  }

  // Update existing ticket
  const updateTicket = (id, ticketData) => {
    return new Promise((resolve, reject) => {
      try {
        loading.value = true
        error.value = ''

        // Validation
        if (!ticketData.title || ticketData.title.trim() === '') {
          throw new Error('Title is required')
        }

        if (!ticketData.status || !['open', 'in_progress', 'closed'].includes(ticketData.status)) {
          throw new Error('Status must be one of: open, in_progress, closed')
        }

        const ticketIndex = tickets.value.findIndex(ticket => ticket.id === id)
        if (ticketIndex === -1) {
          throw new Error('Ticket not found')
        }

        // Update ticket
        tickets.value[ticketIndex] = {
          ...tickets.value[ticketIndex],
          title: ticketData.title.trim(),
          description: ticketData.description?.trim() || '',
          status: ticketData.status,
          priority: ticketData.priority || 'medium',
          updatedAt: new Date().toISOString()
        }

        saveTickets()
        
        loading.value = false
        resolve(tickets.value[ticketIndex])
      } catch (err) {
        loading.value = false
        error.value = err.message
        reject(err)
      }
    })
  }

  // Delete ticket
  const deleteTicket = (id) => {
    return new Promise((resolve, reject) => {
      try {
        loading.value = true
        error.value = ''

        const ticketIndex = tickets.value.findIndex(ticket => ticket.id === id)
        if (ticketIndex === -1) {
          throw new Error('Ticket not found')
        }

        tickets.value.splice(ticketIndex, 1)
        saveTickets()
        
        loading.value = false
        resolve(true)
      } catch (err) {
        loading.value = false
        error.value = err.message
        reject(err)
      }
    })
  }

  // Get ticket by ID
  const getTicketById = (id) => {
    return tickets.value.find(ticket => ticket.id === id)
  }

  // Clear error
  const clearError = () => {
    error.value = ''
  }

  // Initialize store
  loadTickets()

  return {
    tickets,
    loading,
    error,
    totalTickets,
    openTickets,
    inProgressTickets,
    closedTickets,
    createTicket,
    updateTicket,
    deleteTicket,
    getTicketById,
    loadTickets,
    clearError
  }
})
