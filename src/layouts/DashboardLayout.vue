<template>
	<div class="min-h-screen bg-gray-50">
		<!-- Header -->
		<header class="bg-white shadow-sm border-b border-gray-200">
			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div class="flex justify-between items-center h-16">
					<!-- Logo -->
					<div class="flex items-center">
						<router-link
							to="/dashboard"
							class="flex items-center gap-2 text-blue-600 font-semibold text-xl"
						>
							<Logo />
						</router-link>
					</div>

					<!-- Desktop Navigation -->
					<nav class="hidden md:flex space-x-8">
						<router-link
							to="/dashboard"
							class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
							:class="{
								'text-blue-600 bg-blue-50': $route.path === '/dashboard',
							}"
						>
							Dashboard
						</router-link>
						<router-link
							to="/dashboard/tickets"
							class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
							:class="{
								'text-blue-600 bg-blue-50':
									$route.path === '/dashboard/tickets',
							}"
						>
							Tickets
						</router-link>
					</nav>

					<!-- Mobile Menu Button -->
					<div class="md:hidden flex items-center">
						<button
							@click="isMobileMenuOpen = !isMobileMenuOpen"
							class="p-2 rounded-md hover:bg-gray-100 transition"
						>
							<svg
								v-if="!isMobileMenuOpen"
								class="w-6 h-6"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M4 6h16M4 12h16M4 18h16"
								/>
							</svg>
							<svg
								v-else
								class="w-6 h-6"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					</div>

					<!-- User Menu -->
					<div class="hidden md:flex items-center gap-4">
						<span class="text-sm text-gray-600">Welcome, {{ user?.name }}</span>
						<button
							@click="handleLogout"
							class="text-sm font-medium flex items-center gap-3 px-3 py-2 rounded-md hover:bg-red-50 hover:text-red-500 transition-all duration-300"
						>
							<span>Logout</span>
							<LogOut size="20" />
						</button>
					</div>
				</div>
			</div>

			<!-- Mobile Navigation -->
			<transition name="slide-fade">
				<nav
					v-show="isMobileMenuOpen"
					class="md:hidden bg-white border-t border-gray-200 px-4 pt-4 pb-2 space-y-2"
				>
					<router-link
						to="/dashboard"
						class="flex gap-2 items-center text-gray-700 hover:text-blue-600 px-3 py-3 rounded-md text-sm font-medium transition-colors"
						:class="{
							'text-blue-600 bg-blue-50': $route.path === '/dashboard',
						}"
					>
						<Home/> <span>Dashboard</span>
					</router-link>
					<router-link
						to="/dashboard/tickets"
						class="flex gap-2 items-center text-gray-700 hover:text-blue-600 px-3 py-3 rounded-md text-sm font-medium transition-colors"
						:class="{
							'text-blue-600 bg-blue-50': $route.path === '/dashboard/tickets',
						}"
					>
						<Ticket/> <span>Ticket</span>
					</router-link>
					<div class="border-t border-gray-200 pt-2">
						<button
							@click="handleLogout"
							class="w-full text-left text-sm font-medium flex items-center gap-2 px-3 py-2 rounded-md hover:bg-red-50 hover:text-red-500 transition-all duration-300"
						>
							<LogOut size="20" /> Logout
						</button>
					</div>
				</nav>
			</transition>
		</header>

		<!-- Main Content -->
		<main class="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<router-view />
		</main>
	</div>
</template>

<script setup>
import { useAuthStore } from "../stores/auth";
import Logo from "../components/layout/Logo.vue";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { Home, LogOut, Ticket } from "lucide-vue-next";

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const handleLogout = () => authStore.logout();

// Mobile menu state
const isMobileMenuOpen = ref(false);

</script>

<style>
.slide-fade-enter-active,
.slide-fade-leave-active {
	transition: all 0.3s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
	opacity: 0;
	transform: translateY(-10px);
}
</style>
