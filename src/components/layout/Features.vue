<template>
  <section
    id="features"
    class="bg-white py-20 px-6 text-center min-h-[400px]"
    aria-labelledby="features-heading"
  >
    <div class="max-w-[1440px] mx-auto">
      <!-- Heading -->
      <h2
        id="features-heading"
        class="text-3xl md:text-4xl font-extrabold text-gray-800 mb-6"
      >
        Powerful Features to Simplify Your Workflow
      </h2>
      <p class="text-gray-600 max-w-2xl mx-auto mb-12">
        Everything you need to manage, track, and resolve tickets efficiently
        — all in one place.
      </p>

      <!-- Features Grid -->
      <div class="grid gap-8 md:grid-cols-3">
        <div
          v-for="feature in features"
          :key="feature.id"
          class="bg-blue-50 rounded-2xl shadow-md hover:shadow-lg transition p-8 flex flex-col items-center text-center focus-within:ring-2 focus-within:ring-blue-400"
          tabindex="0"
          role="article"
          :aria-label="feature.title"
        >
          <div class="mb-4">
            <component :is="feature.icon" />
          </div>
          <h3 class="text-xl font-semibold text-gray-800 mb-2">
            {{ feature.title }}
          </h3>
          <p class="text-gray-600 text-base leading-relaxed">
            {{ feature.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { CheckCircle, Clock, BarChart3 } from 'lucide-vue-next'

const features = [
  {
    id: 1,
    icon: CheckCircle,
    title: "Easy Ticketing",
    description:
      "Create, assign, and manage tickets effortlessly with intuitive forms and real-time updates.",
  },
  {
    id: 2,
    icon: Clock,
    title: "Real-Time Tracking",
    description:
      "Monitor open, in-progress, and closed tickets at a glance using your dashboard summary cards.",
  },
  {
    id: 3,
    icon: BarChart3,
    title: "Insightful Dashboard",
    description:
      "Gain quick insights into your workflow with stats and visual summaries of all ticket statuses.",
  },
]
</script>
