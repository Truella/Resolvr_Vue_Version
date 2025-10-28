# 🟢 Resolvr - Vue Ticket Management App

A progressive ticket management application built with Vue 3 and Vite, implementing authentication, dashboard, and CRUD functionality with reactive state management.

## 🔗 Other Versions

This project is available in multiple frameworks:

- **⚛️ React Version** - [Repository](https://github.com/truella/Resolvr_React_Version) | [Live Demo](https://truella.github.io/Resolvr_React_Version_/)
- **🟢 Vue Version** (You are here) - [Live Demo](https://truella.github.io/Resolvr_Vue_Version/#/)
- **🐘 PHP Twig Version** - [Repository](https://github.com/truella/resolvr_Twig_Version) | [Live Demo](https://resolvrtwigversion-production.up.railway.app/dashboard)



## ⚙️ Setup and Run

### Local Development

```bash
# Clone the repository
git clone https://github.com/truella/Resolvr_Vue_Version.git
cd resolvr-vue

# Install dependencies
npm install

# Run development server
npm run dev
```

Open in your browser: `http://localhost:5173`

### Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```


## 🔐 Authentication

- **LocalStorage-based** authentication with `ticketapp_session` key
- Reactive authentication state with Pinia store
- Navigation guards for route protection
- Auto-redirect for authenticated users
- Persistent login across page refreshes
- Clean logout with state reset


## 🎨 UI Features

- **Hero Section** - Animated SVG background with decorative elements
- **Reactive Cards** - Auto-updating ticket and stat displays
- **Toast Notifications** - Non-intrusive feedback system
- **Loading States** - Skeleton screens and spinners
- **Smooth Transitions** - Vue's built-in transition system
- **Mobile-First** - Responsive design with Tailwind breakpoints


## 📦 Dependencies

```json
{
  "vue": "^3.3.0",
  "vue-router": "^4.2.0",
  "pinia": "^2.1.0",
  "@heroicons/vue": "^2.0.0",
  "vue-toastification": "^2.0.0"
}
```


## 📝 License

MIT License - Free for personal and commercial use


## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

