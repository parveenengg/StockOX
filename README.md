<div align="center">

# 📦 StockOX

**The ultimate enterprise-grade inventory management frontend.** <br>
Built for scale, speed, and modern B2B SaaS aesthetics.

[![React](https://img.shields.io/badge/React-19.0-blue.svg?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-8.0-purple.svg?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC.svg?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

</div>

---

## 🚀 Getting Started

Welcome to StockOX! This repository contains the highly-polished frontend UI tailored for high-volume inventory operations, automated supply chain predictions, and seamless global stock management.

### Prerequisites
Before you clone the repository, ensure you have the following installed to prevent compilation errors:
- **Node.js**: `v20.0.0` or higher recommended.
- **npm**: `v10+` (comes with Node 20).

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/parveenengg/StockOX.git
   cd StockOX
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   > You can now access the app locally, typically at `http://localhost:5173`.

---

## 🏗️ Project Architecture & Navigation

To avoid getting lost, here is how the global frontend router is partitioned:

### 1. Public Pages (Stateless)
Protected by `<PublicLayout />` which seamlessly maps the top navigation and compact footer automatically.
- `/` - Landing Page (Hero, Features overview, Testimonials)
- `/features` - Comprehensive technical feature breakdown
- `/pricing` - SaaS pricing tiers (Free, Pro, Enterprise)
- `/blogs` & `/join` - Informational out-of-bounds pages

### 2. Authentication Flow
**⚠️ CRITICAL TERMINOLOGY NOTE:** We have completely purged the word "Login" from the codebase.
If you are modifying the authentication screens, you must look for **Sign In**.
-  `/sign-in` (Handled by `SignIn.jsx` - Do not link to `/login`!)
-  `/register` (Creates a new workspace)
-  `/forgot-password` & `/set-new-password`

### 3. Dashboard (Protected)
Handled strictly by `<DashboardLayout />` mapping a persistent sidebar and top data-nav.
- `/dashboard` - Overview (Charts, low stock alerts)
- `/dashboard/products` - Product matrices
- `/dashboard/settings` - Manage organizational data, imports, and user profiles.

---

## 🎨 Design System & Packages

StockOX features a highly resilient and modern design structure that you should inherit if you add new components:

- **Styling**: Vanilla standard **Tailwind v4** (`@tailwindcss/vite`). Stick strictly to the `<div className="bg-slate-50 border-slate-200 shadow-sm rounded-xl">` patterns used heavily across the repo for uniformity.
- **Icons**: Natively integrated with `lucide-react`. Do not import SVGs heavily; check lucide first!
- **Charting**: Using `recharts` tightly coupled inside the Dashboard logic for complex metrics.
- **Micro-Animations**: Uses `framer-motion` and native tailwind classes (`animate-fade-in`, `hover:-translate-y-1`) for buttery-smooth user interactions.

---

## 🔧 Building for Production

When you are ready to wrap the application and serve it via an NGINX container or Vercel edge deployment:

```bash
npm run build
```
This generates a highly optimized output in the `/dist` directory powered by Vite chunking algorithms!

---

## 🤝 Contributing & Next Steps

If you are picking up this project, the UI is essentially **100% Demo Ready**! Your immediate next milestone should be patching the frontend API hooks mapping inside `/src/services/api.js` and `/src/services/auth.service.js` directly to your Node/Express backend!
