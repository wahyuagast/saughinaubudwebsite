# Saughina Ubud Website

A static, responsive website for Saughina Ubud built with HTML, CSS, and vanilla JavaScript. It includes system-aware dark mode with a visible toggle, a frosted glass navbar, a motion-style image carousel, and polished CTAs.

## Overview
- Single-page static site: `index.html`, `styles.css`, `script.js`, `assets/`
- Dark/light theme with system preference detection and manual toggle
- Hero section featuring `assets/villa-exterior.jpg` with readable overlay
- Frosted/blurred navbar for light and dark modes
- Carousel replacing the gallery using existing images in `assets/`
- Floating CTA and accessible anchor navigation

## Features
- Dark Mode: Auto-detects OS theme; user-toggle cycles Light → Dark → System
- Theming via CSS variables on `data-theme` for maintainability
- Motion-style Carousel: prev/current/next with smooth transforms and controls
- Responsive Design: mobile-friendly layout; map iframe and images auto-fit
- Accessibility: ARIA labels for carousel, keyboard-friendly links

## Getting Started
- Open `index.html` directly in a browser, or serve locally:

```bash
# Using Python (if available)
python -m http.server 8080
# Then visit http://localhost:8080
```

On Windows without Python, you can use any simple static server (e.g., VS Code Live Server).

## Project Structure
```
index.html      # Main page markup
styles.css      # Global styles, theming, responsive rules
script.js       # Interactivity: theme toggle, carousel, CTA, menu
assets/         # Images and favicon (logo)
```

## Theming
- Root attribute `data-theme` controls CSS variables
- Persistent user choice via `localStorage` (`theme-mode` key)
- System preference via `matchMedia('(prefers-color-scheme: dark)')`

## Carousel
- Vanilla JS: renders only previous/current/next items
- Smooth swap-like animation via CSS transitions and transforms
- Images sourced from `assets/` (excluding logo files)

## Development Tips
- Edit content in `index.html`
- Adjust colors and typography in `styles.css` (CSS variables)
- Update carousel asset list in `script.js` (`carouselImages` array)
- Add new images to `assets/`; ensure reasonable dimensions for performance

## Deployment
- Host on any static platform (GitHub Pages, Netlify, Vercel)
- For GitHub Pages:
  1. Push `main` branch
  2. Enable Pages: Settings → Pages → Branch: `main` (root)
  3. Visit the published URL

## Assets & Attribution
- Favicon: `assets/logo.png`
- Hero image: `assets/villa-exterior.jpg`
- Other images: located in `assets/`

## License
This repository is intended for the Saughina Ubud website. Add a license if you plan public reuse.
