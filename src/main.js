import { createApp } from "vue";
import { createPinia } from "pinia";
import { createRouter, createWebHashHistory } from "vue-router"; // ✅ use hash history
import App from "./App.vue";
import "./main.css";
import ToastContainer from "./components/ui/ToastContainer.vue";
import { authGuard, guestGuard } from "./router/guards";

// Import pages
import LandingPage from "./pages/LandingPage.vue";
import Auth from "./pages/Auth.vue";
import Dashboard from "./pages/Dashboard.vue";
import Tickets from "./pages/Tickets.vue";

// Import layouts
import LandingLayout from "./layouts/LandingLayout.vue";
import AuthLayout from "./layouts/AuthLayout.vue";
import DashboardLayout from "./layouts/DashboardLayout.vue";

// Router configuration
const routes = [
	{
		path: "/",
		component: LandingLayout,
		children: [{ path: "", name: "home", component: LandingPage }],
	},
	{
		path: "/auth",
		component: AuthLayout,
		children: [
			{ path: "login", name: "login", component: Auth },
			{ path: "signup", name: "signup", component: Auth },
		],
	},
	{
		path: "/dashboard",
		component: DashboardLayout,
		children: [
			{ path: "", name: "dashboard", component: Dashboard },
			{ path: "tickets", name: "tickets", component: Tickets },
		],
	},
];

// Create router with hash history for GitHub Pages
const router = createRouter({
	history: createWebHashHistory(), 
	routes,
});

// Add route guards
router.beforeEach((to, from, next) => {
	if (to.path.startsWith("/dashboard")) {
		authGuard(to, from, next);
	} else if (to.path.startsWith("/auth")) {
		guestGuard(to, from, next);
	} else {
		next();
	}
});

// Create Vue app
const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);

// Register global components
app.component("ToastContainer", ToastContainer);

// Mount app
app.mount("#app");
