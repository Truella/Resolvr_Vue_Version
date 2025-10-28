<template>
	<section
		class="relative bg-gradient-to-br from-blue-50 to-blue-100 overflow-hidden h-screen"
		aria-label="Landing hero section"
	>
		<!-- Decorative circles -->
		<div
			class="absolute right-7 top-12 w-20 h-20 bg-blue-300 rounded-full opacity-70 animate-pulse z-10"
			aria-hidden="true"
		></div>
		<div
			class="absolute right-7 top-12 w-40 h-40 bg-blue-200 rounded-full opacity-70 animate-pulse z-10"
			aria-hidden="true"
		></div>

		<!-- Main content -->
		<div
			class="relative z-10 max-w-[1440px] mx-auto px-6 pt-20 pb-32 text-center md:pt-32 md:pb-48"
		>
			<div>
				<h1
					class="text-4xl md:text-6xl md:my-2 font-extrabold text-gray-800 leading-tight"
				>
					Manage Your Tickets <br class="hidden md:block mt-2" />
					<span class="mt-4 block">Effortlessly</span>
				</h1>

				<p class="mt-4 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
					Simplify your workflow. Create, track, and resolve support tickets all
					in one place.
				</p>

				<div class="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
					<button
						@click="navigateToSignup"
						class="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:outline-none transition flex items-center justify-center gap-2"
					>
						Get Started <ArrowRight :size="18" />
					</button>

					<button
						@click="navigateToLogin"
						class="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-600 hover:text-white focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
					>
						Login
					</button>
				</div>
			</div>
		</div>

		<!-- Wave SVG -->
		<svg
			class="absolute bottom-0 left-0 w-full text-white"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 1440 320"
			preserveAspectRatio="none"
			aria-hidden="true"
		>
			<path
				fill="currentColor"
				d="M0,256L30,250.7C60,245,120,235,180,218.7C240,203,300,181,360,181.3C420,181,480,203,540,192C600,181,660,139,720,128C780,117,840,139,900,160C960,181,1020,203,1080,192C1140,181,1200,139,1260,144C1320,149,1380,203,1410,229.3L1440,256V320H0Z"
			/>
		</svg>
	</section>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ArrowRight } from "lucide-vue-next";

const router = useRouter();

const navigateToSignup = () => router.push("/auth/signup");
const navigateToLogin = () => router.push("/auth/login");
</script>
