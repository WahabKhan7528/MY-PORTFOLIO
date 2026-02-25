# WAHAB KHAN - Portfolio Website

A cutting-edge, interactive portfolio website showcasing full-stack web development expertise. Built with modern web technologies and featuring stunning animations, glassmorphism design, and seamless user experience.

## 🌟 Live Demo

[View Portfolio](https://wahabkhan0225.vercel.app/)

## 📱 Features

### Core Functionality

- **Hero Section**: Interactive ripple effects with Three.js WebGL shaders
- **Smooth Scrolling**: Locomotive Scroll with custom easing and momentum
- **Glassmorphism UI**: Modern glass-effect components with backdrop blur
- **Responsive Design**: Mobile-first approach with breakpoint optimization
- **Dark Theme**: Elegant black background with white accent elements

### Interactive Elements

- **Custom Cursor**: Desktop cursor with magnetic effects and hover states
- **Scroll Progress**: Real-time page scroll indicator
- **Floating Resume**: Downloadable PDF with hover animations
- **Preloader**: Animated loading sequence with text effects
- **Mobile Navigation**: Slide-out menu with gesture support

### Content Sections

- **About**: Personal background, expertise, and professional stats
- **Skills**: Animated progress bars and technology categorization
- **Projects**: Dynamic project showcase with modal previews
- **Contact**: EmailJS integration with form validation

## 🛠️ Tech Stack

### Frontend Core

- **React 19.2.0**: Latest React with concurrent features
- **Vite 7.2.4**: Next-generation build tool with HMR
- **Tailwind CSS 4.1.18**: Utility-first CSS framework
- **PostCSS**: CSS processing with autoprefixer

### Animation & Interaction

- **GSAP 3.14.2**: Professional-grade animation library
  - ScrollTrigger for scroll-based animations
  - Timeline for complex sequences
  - QuickTo for performant mouse tracking
- **Locomotive Scroll 5.0.1**: Smooth scrolling with momentum
- **@react-three/fiber & drei**: React Three.js for WebGL effects

### Communication

- **EmailJS**: Client-side email service for contact forms
- **@emailjs/browser**: Modern EmailJS implementation

### Development Tools

- **ESLint 9.39.1**: Code linting with React-specific rules
- **Autoprefixer**: Automatic CSS vendor prefixing
- **Vite React Plugin**: Optimized React development experience

## 🏗️ Project Architecture

### Directory Structure

```
src/
├── components/           # React components
│   ├── About.jsx        # About section with skills overview
│   ├── Contact.jsx      # Contact form with EmailJS
│   ├── CustomCursor.jsx # Desktop cursor with animations
│   ├── FloatingResumeButton.jsx # Downloadable resume
│   ├── Hero.jsx         # Landing section with ripple effect
│   ├── Navbar.jsx       # Navigation with mobile menu
│   ├── Preloader.jsx    # Loading animation
│   ├── Projects.jsx     # Project showcase with modals
│   ├── RippleEffect.jsx # WebGL ripple shader effect
│   ├── ScrollProgress.jsx # Page scroll indicator
│   └── Skills.jsx       # Skills with animated progress
├── assets/              # Static assets
├── App.jsx             # Main application component
├── main.jsx            # React entry point
└── index.css           # Global styles and utilities

public/
├── project-images/      # Project screenshots
├── resume.pdf          # Downloadable resume
└── favicon.png         # Site favicon
```

### Component Details

#### Core Layout Components

- **App.jsx**: Main application wrapper with Locomotive Scroll setup
- **Navbar.jsx**: Responsive navigation with glassmorphism design
- **Preloader.jsx**: Animated loading screen with GSAP timeline

#### Content Components

- **Hero.jsx**: Hero section with Three.js ripple background
- **About.jsx**: Personal introduction with floating decorative elements
- **Skills.jsx**: Technology skills with animated progress bars
- **Projects.jsx**: Project portfolio with modal previews and filtering
- **Contact.jsx**: Contact form with EmailJS integration and social links

#### Enhancement Components

- **CustomCursor.jsx**: Desktop cursor with magnetic hover effects
- **ScrollProgress.jsx**: Fixed scroll progress indicator
- **FloatingResumeButton.jsx**: Floating action button for resume download
- **RippleEffect.jsx**: WebGL shader-based ripple effect for Hero

## 🎨 Design System

### Color Palette

- **Primary**: Black (#000000) - Main background
- **Glass Effects**: White with opacity (rgba(255,255,255,0.05-0.15))
- **Text**: White (#FFFFFF) - Primary text
- **Accent**: Gray variants (#d1d5db, #6b7280) - Secondary text
- **Borders**: White with low opacity - Subtle borders

### Typography

- **Primary Font**: Inter - Clean, modern sans-serif
- **Display Font**: Playfair Display - Elegant serif for headings
- **Font Weights**: 300-700 range for hierarchy

### Glass Morphism System

```css
.glass {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.glass-light {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
}

.glass-strong {
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(16px);
}
```

## ⚡ Performance Optimizations

### Code Splitting

- **Lazy Loading**: RippleEffect component loaded asynchronously
- **Dynamic Imports**: EmailJS loaded on-demand for contact form

### Animation Performance

- **GSAP Optimizations**: Hardware acceleration with transform3d
- **RequestAnimationFrame**: Smooth scroll progress updates
- **QuickTo**: Optimized mouse tracking for cursors

### WebGL Optimizations

- **Geometry Reduction**: 64x64 segments for optimal performance
- **Shader Efficiency**: Minimal fragment operations
- **Canvas Settings**: Power preference and antialias settings
- **DPR Limiting**: Maximum 1.5x pixel ratio for high-DPI displays

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ (recommended: 18+)
- npm or yarn package manager
- Modern browser with WebGL support

### Installation

```bash
# Clone the repository
git clone https://github.com/WahabKhan7528/MY-PORTFOLIO.git

# Navigate to project directory
cd MY-PORTFOLIO

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev

# Open http://localhost:5173
```

### Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

### Linting

```bash
# Run ESLint
npm run lint
```

## 📧 Contact Form Setup

The contact form uses EmailJS for client-side email functionality. To set up:

1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Create a service and template
3. Add environment variables:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

## 🎯 Featured Projects

### ENCODEX - Secure Encryption Tool

- **Tech**: Vanilla JS, Web Crypto API, AES-GCM
- **Features**: Client-side encryption, file support, QR codes
- **Demo**: [encodex-chi.vercel.app](https://encodex-chi.vercel.app/)

### Library Management System

- **Tech**: MERN Stack, JWT, Cloudinary, Nodemailer
- **Features**: Authentication, CRUD operations, email notifications
- **Status**: In Development

### WOXO Blogs

- **Tech**: React, Tailwind CSS, React Router
- **Features**: Responsive design, component architecture
- **Demo**: [woxo-blogs-v2.vercel.app](https://woxo-blogs-v2.vercel.app/)

### College Website - LMS & CMS

- **Tech**: MERN Stack, Role-based access
- **Features**: Learning management, content management
- **Demo**: [the-best-group-of-colleges.vercel.app](https://the-best-group-of-colleges.vercel.app/)

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

_WebGL and modern JavaScript features required_

## 📄 License

This project is for portfolio purposes. All rights reserved.

## 👨‍💻 Contact

**Abdul Wahab Khan Arib**

- 📧 Email: haribkhan0625@gmail.com
- 📱 Phone: +92 3078997313
- 📍 Location: Bahawalpur, Pakistan
- 💼 LinkedIn: [abdul-wahab-khan-arib](https://www.linkedin.com/in/abdul-wahab-khan-arib/)
- 💻 GitHub: [WahabKhan7528](https://github.com/WahabKhan7528)
- 📷 Instagram: [@nexyvora](https://www.instagram.com/nexyvora/)

---

_Available for freelance and full-time opportunities_ ✨
