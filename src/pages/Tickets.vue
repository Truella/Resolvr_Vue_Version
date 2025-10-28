<template>
  <div>
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Ticket Management</h1>
      <p class="text-gray-600">
        Manage and track all your support tickets
      </p>
    </div>

    <!-- Filters and Actions -->
   <div class="bg-white rounded-lg shadow-sm p-4 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
  <div class="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
    <div class="relative">
      <label for="status-filter" class="sr-only">
        Filter by status
      </label>
      <select
        id="status-filter"
        v-model="selectedStatus"
        class="w-full sm:w-48 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white appearance-none cursor-pointer"
        aria-label="Filter tickets by status"
      >
        <option value="">All Status</option>
        <option value="open">Open</option>
        <option value="in_progress">In Progress</option>
        <option value="closed">Closed</option>
      </select>
    </div>

    <div class="relative w-full sm:w-96">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.3-4.3"></path>
      </svg>
      <input
        type="search"
        placeholder="Search tickets..."
        v-model="searchQuery"
        aria-label="Search tickets"
        class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  </div>

  <button
    @click="createNewTicket"
    class="w-full sm:w-auto flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
    aria-label="Create new ticket"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="w-5 h-5 mr-2"
      aria-hidden="true"
    >
      <path d="M5 12h14"></path>
      <path d="M12 5v14"></path>
    </svg>
    Create Ticket
  </button>
</div>

    <!-- Tickets Grid -->
    <div v-if="filteredTickets.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <TicketCard
        v-for="ticket in filteredTickets"
        :key="ticket.id"
        :ticket="ticket"
        @edit="editTicket"
        @delete="confirmDeleteTicket"
      />
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-12">
      <Ticket class="w-12 h-12 text-gray-400 mx-auto mb-4" />
      <h3 class="text-lg font-medium text-gray-900 mb-2">No tickets found</h3>
      <p class="text-gray-500 mb-4">Get started by creating your first ticket.</p>
      <button
        @click="createNewTicket"
        class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
      >
        Create Ticket
      </button>
    </div>

    <!-- Ticket Form Modal -->
    <TicketForm
      v-if="showForm"
      :key="`form-${showForm}-${isEditing}`"
      :is-open="showForm"
      :ticket="editingTicket"
      :is-editing="isEditing"
      @close="closeForm"
      @submit="handleFormSubmit"
    />

    <!-- Delete Confirmation Dialog -->
    <ConfirmDialog
      :is-open="showDeleteDialog"
      title="Delete Ticket"
      :message="`Are you sure you want to delete ticket #${ticketToDelete?.id}? This action cannot be undone.`"
      confirm-text="Delete"
      @close="closeDeleteDialog"
      @confirm="deleteTicket"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useTicketsStore } from '../stores/tickets'
import { useToast } from '../composables/useToast'
import { Ticket } from 'lucide-vue-next'
import TicketCard from '../components/tickets/TicketCard.vue'
import TicketForm from '../components/tickets/TicketForm.vue'
import ConfirmDialog from '../components/ui/ConfirmDialog.vue'

const ticketsStore = useTicketsStore()
const { success, error: showError } = useToast()

// Reactive data
const selectedStatus = ref('')
const searchQuery = ref('')
const showForm = ref(false)
const showDeleteDialog = ref(false)
const editingTicket = ref(null)
const isEditing = ref(false)
const ticketToDelete = ref(null)

// Computed properties
const filteredTickets = computed(() => {
  let filtered = ticketsStore.tickets

  if (selectedStatus.value) {
    filtered = filtered.filter(ticket => 
      ticket.status === selectedStatus.value
    )
  }

  if (searchQuery.value) {
    filtered = filtered.filter(ticket =>
      ticket.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  return filtered
})

// Methods
const createNewTicket = () => {
  editingTicket.value = null
  isEditing.value = false
  showForm.value = true
}

const editTicket = (ticket) => {
  editingTicket.value = ticket
  isEditing.value = true
  showForm.value = true
}

const closeForm = () => {
  showForm.value = false
  editingTicket.value = null
  isEditing.value = false
}

const handleFormSubmit = async (ticketData) => {
  try {
    if (isEditing.value) {
      await ticketsStore.updateTicket(editingTicket.value.id, ticketData)
      success('Success', 'Ticket updated successfully!')
    } else {
      await ticketsStore.createTicket(ticketData)
      success('Success', 'Ticket created successfully!')
    }
    closeForm()
  } catch (err) {
    showError('Error', err.message || 'Failed to save ticket')
  }
}

const confirmDeleteTicket = (ticketId) => {
  const ticket = ticketsStore.getTicketById(ticketId)
  if (ticket) {
    ticketToDelete.value = ticket
    showDeleteDialog.value = true
  }
}

const closeDeleteDialog = () => {
  showDeleteDialog.value = false
  ticketToDelete.value = null
}

const deleteTicket = async () => {
  if (!ticketToDelete.value) return

  try {
    await ticketsStore.deleteTicket(ticketToDelete.value.id)
    success('Success', 'Ticket deleted successfully!')
    closeDeleteDialog()
  } catch (err) {
    showError('Error', err.message || 'Failed to delete ticket')
  }
}

onMounted(() => {
  // Load tickets when component mounts
  ticketsStore.loadTickets()
})
</script>