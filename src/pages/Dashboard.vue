<template>
  <div>
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-2 hidden md:block">Dashboard</h1>
      <h1 class="text-3xl font-medium text-gray-900 mb-2 md:hidden">Welcome, {{ user.name }}</h1>
      <p class="text-gray-600">
        Overview of your ticket management system
      </p>
    </div>

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div
        v-for="stat in statCards"
        :key="stat.title"
        class="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow"
      >
        <div class="flex items-center justify-between mb-4">
          <div :class="stat.bgLight" class="p-3 rounded-lg">
            <component :is="stat.icon" :class="stat.textColor" class="w-6 h-6" />
          </div>
        </div>
        <h3 class="text-gray-600 text-sm font-medium mb-1">
          {{ stat.title }}
        </h3>
        <p class="text-3xl font-bold text-gray-900">{{ stat.value }}</p>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200 mb-8">
      <h2 class="text-xl font-semibold text-gray-900 mb-4 flex items-center">
        <BarChart3 class="w-5 h-5 mr-2 text-blue-600" />
        Quick Actions
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <router-link
          to="/dashboard/tickets"
          class="flex items-center justify-between p-4 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors group"
        >
          <div class="flex items-center">
            <Ticket class="w-5 h-5 text-blue-600 mr-3" />
            <span class="font-medium text-gray-900">
              Manage Tickets
            </span>
          </div>
          <ArrowRight class="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform" />
        </router-link>

        <button class="flex items-center justify-between p-4 bg-green-50 hover:bg-green-100 rounded-lg border border-green-200 transition-colors group">
          <div class="flex items-center">
            <CheckCircle class="w-5 h-5 text-green-600 mr-3" />
            <span class="font-medium text-gray-900">View Resolved</span>
          </div>
          <ArrowRight class="w-5 h-5 text-green-600 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <h2 class="text-xl font-semibold text-gray-900 mb-4">
        Recent Activity
      </h2>
      <div class="space-y-3">
        <div
          v-for="activity in recentActivities"
          :key="activity.id"
          class="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
        >
          <div class="flex items-center">
            <div
              :class="getStatusColor(activity.status)"
              class="w-2 h-2 rounded-full mr-3"
            />
            <span class="text-gray-900">{{ activity.action }}</span>
          </div>
          <span class="text-sm text-gray-500">{{ activity.time }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { BarChart3, Ticket, CheckCircle, Clock, AlertCircle, ArrowRight } from 'lucide-vue-next'
import { useTicketsStore } from '../stores/tickets'
import { useAuthStore } from '../stores/auth'

import { storeToRefs } from "pinia";

const ticketsStore = useTicketsStore()

const statCards = computed(() => [
  {
    title: "Total Tickets",
    value: ticketsStore.totalTickets,
    icon: Ticket,
    color: "bg-blue-500",
    textColor: "text-blue-600",
    bgLight: "bg-blue-50",
  },
  {
    title: "Open Tickets",
    value: ticketsStore.openTickets,
    icon: AlertCircle,
    color: "bg-red-500",
    textColor: "text-red-600",
    bgLight: "bg-red-50",
  },
  {
    title: "In Progress",
    value: ticketsStore.inProgressTickets,
    icon: Clock,
    color: "bg-yellow-500",
    textColor: "text-yellow-600",
    bgLight: "bg-yellow-50",
  },
  {
    title: "Resolved",
    value: ticketsStore.closedTickets,
    icon: CheckCircle,
    color: "bg-green-500",
    textColor: "text-green-600",
    bgLight: "bg-green-50",
  },
])

const recentActivities = ref([
  {
    id: 1,
    action: "Ticket #1234 created",
    time: "5 minutes ago",
    status: "open",
  },
  {
    id: 2,
    action: "Ticket #1233 resolved",
    time: "1 hour ago",
    status: "resolved",
  },
  {
    id: 3,
    action: "Ticket #1232 updated",
    time: "3 hours ago",
    status: "progress",
  },
  {
    id: 4,
    action: "Ticket #1231 assigned",
    time: "5 hours ago",
    status: "progress",
  },
])

const getStatusColor = (status) => {
  switch (status) {
    case "resolved":
      return "bg-green-500"
    case "progress":
      return "bg-yellow-500"
    default:
      return "bg-red-500"
  }
} 
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
onMounted(() => {
  // Load tickets to update stats
  ticketsStore.loadTickets()
})
</script>
