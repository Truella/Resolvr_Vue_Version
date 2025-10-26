<template>
  <article class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
    <!-- Header -->
    <div class="flex justify-between items-start mb-4">
      <h3 class="text-lg font-semibold text-gray-900 flex-1 mr-2">
        {{ ticket.title }}
      </h3>
      <span
        :class="getStatusClasses(ticket.status)"
        class="px-3 py-1 rounded-full text-xs font-medium border"
      >
        {{ formatStatus(ticket.status) }}
      </span>
    </div>

    <!-- Description -->
    <p v-if="ticket.description" class="text-gray-600 text-sm mb-4 line-clamp-3">
      {{ ticket.description }}
    </p>

    <!-- Footer -->
    <div class="flex items-center justify-between pt-4 border-t border-gray-200">
      <span class="text-xs text-gray-500 capitalize">
        Priority: {{ ticket.priority }}
      </span>
      <div class="flex space-x-2">
        <button
          @click="$emit('edit', ticket)"
          :aria-label="`Edit ticket: ${ticket.title}`"
          class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        >
          <Edit2Icon class="w-4 h-4" aria-hidden="true" />
        </button>
        <button
          @click="$emit('delete', ticket.id)"
          :aria-label="`Delete ticket: ${ticket.title}`"
          class="p-2 text-red-600 hover:bg-red-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
        >
          <Trash2Icon class="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  </article>
</template>

<script setup>
// Import icons - adjust the import path based on your setup
// If using lucide-vue-next: import { Edit2, Trash2 } from 'lucide-vue-next'
// For this example, using placeholder icon components
const Edit2Icon = {
  template: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>'
}

const Trash2Icon = {
  template: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>'
}

const props = defineProps({
  ticket: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['edit', 'delete'])

const getStatusClasses = (status) => {
  const styles = {
    open: 'bg-green-100 text-green-800 border-green-300',
    in_progress: 'bg-amber-100 text-amber-800 border-amber-300',
    closed: 'bg-gray-100 text-gray-800 border-gray-300'
  }
  return styles[status] || styles.open
}

const formatStatus = (status) => {
  const labels = {
    open: 'Open',
    in_progress: 'In Progress',
    closed: 'Closed'
  }
  return labels[status] || status
}
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>