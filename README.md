# SCM Children Academy Website

Welcome to the official source code repository for the **SCM Children Academy** website. This project is a modern, responsive, and highly animated multi-page web application rebuilt from the ground up using React, Vite, and TypeScript.

## 🌟 Overview

The new SCM Children Academy website offers a premium user experience, complete with dynamic scroll animations, glassmorphism UI elements, and a completely responsive layout. It features a complete migration of the old website's content into a fast, modern frontend stack.

### Key Features
- **Multi-page Architecture**: Built with `react-router-dom` to provide seamless navigation across 12+ pages (Home, About Us, Admissions, Academics, Contact, etc.).
- **Modern UI/UX**: Includes a custom design system with CSS variables, a sticky glassmorphic navigation header, hover micro-interactions, and beautifully designed cards.
- **Scroll Animations**: A custom intersection observer hook (`useScrollAnimation`) triggers entrance animations as elements enter the viewport.
- **Responsive Design**: fully adapted for desktop, tablet, and mobile viewing, including an interactive mobile accordion menu.
- **Type-Safe**: Written in strict TypeScript to ensure long-term maintainability.

## 🚀 Tech Stack

- **Framework**: [React 18](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Routing**: [React Router v6](https://reactrouter.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Icons**: [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)
- **Smooth Scrolling**: [Lenis](https://lenis.studiofreight.com/)

## 🛠️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/rajat2515/scm-website.git
   cd scm-website
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`.

4. **Build for production:**
   ```bash
   npm run build
   ```
   This command compiles the TypeScript files and generates the production-ready static assets in the `dist/` directory.

## 📂 Project Structure

```text
src/
├── assets/        # Static assets (images, logos)
├── components/    # Reusable UI components (Header, Footer, PageHero, Sections)
├── hooks/         # Custom React hooks (useScrollAnimation, useSmoothScroll)
├── pages/         # Route components (Introduction, Facilities, Contact Us, etc.)
├── App.tsx        # Main application component and routing configuration
├── main.tsx       # Application entry point
└── index.css      # Global styles, design tokens, and animation keyframes
```

## 🔒 Security Notes

- This is a static frontend project with no active backend integration or database connections.
- All external links open securely with `rel="noopener noreferrer"`.
- The Contact form currently serves as a UI template and processes data purely on the client side.

## 📜 License

Copyright © 2026 All Rights Reserved. SCM Children Academy, Haldaur, Bijnor.
