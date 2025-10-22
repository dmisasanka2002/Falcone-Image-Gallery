# Falcon Image Gallery

A modern, responsive image gallery built with React, Vite and Tailwind CSS. The project demonstrates a categorized masonry-style gallery with pagination, modal image preview, smooth animations and an accessible UI.

This README documents how to run, build and contribute to the project, and describes the project's structure and design decisions.

## Table of contents

- Project overview
- Features
- Tech stack
-- Getting started
  - Prerequisites
  - Install
  - Development (run)
  - Build and preview
- Project structure
- Key files and components
- Styling and assets
- Scripts
- Contributing
- License & credits

## Project overview

Falcon E Gallery is a single-page React application scaffolded with Vite. It contains a curated set of images grouped into categories (Events, Workshops, Products, Team, Community). Users can filter by category, paginate the gallery, and open images in a modal viewer with navigation controls.

While the current project uses in-file static data (in `src/App.jsx`), it is structured so replacing the static data with a remote API or local JSON file is straightforward.

![App Preview](public/preview.png)

## Features

- Categorized gallery with counts and active-state styling
- Masonry-like responsive layout using CSS columns
- Pagination with Previous/Next and page buttons
- Image modal with next/previous navigation and close control
- Smooth entrance and hover animations
- Tailwind CSS utility classes for fast styling
- Icons from `lucide-react`

## Tech stack

- React 19
- Vite (development server and bundler)
- Tailwind CSS (via `@tailwindcss/vite` plugin)
- lucide-react (icon set)
- ESLint (basic linting config included)

## Getting started

### Prerequisites

- Node.js (LTS). The project was developed using Node 22 but should work with any recent LTS node.
- npm (comes with Node) or a compatible package manager.

### Install

1. Open a terminal at the project root (where `package.json` lives).
2. Install dependencies:

```powershell
npm install
```

### Development (run)

Start the Vite development server:

```powershell
npm run dev
```

Open the Vite URL printed in the terminal (typically [https://localhost:5173](https://localhost:5173) or [http://localhost:5173](http://localhost:5173)) in your browser. The page will hot-reload on file changes.

### Build and preview

Build the production bundle:

```powershell
npm run build
```

Preview the production build locally:

```powershell
npm run preview
```

## Project structure

Top-level files/folders you will interact with:

- `index.html` — Vite entry HTML that bootstraps the app and loads `src/main.jsx`.
- `package.json` — project manifest and scripts.
- `vite.config.js` — Vite configuration (React plugin + Tailwind plugin).
- `src/` — source code:
  - `main.jsx` — React entry that mounts the app.
  - `App.jsx` — main Gallery component and UI.
  - `data.json` — gallery data file.
  - `index.css` — imports Tailwind; extend here for global styles.
- `public/` — static assets served.

## Key files and components

- `src/App.jsx`
  - Contains the full gallery implementation: categories, filtering, pagination, modal viewer and UI markup.
  - The gallery data is defined inline in `data.json`.
  - Uses React state hooks to manage: selected category, modal state, current page, and selected image.

- `src/main.jsx`
  - Standard React 18+ root creation via `createRoot` and renders `<App />`.


## Styling and assets

- Tailwind CSS is imported in `src/index.css` via `@import "tailwindcss";` and configured through the Vite plugin.

## Scripts

`package.json` exposes the following scripts:

- `npm run dev` — start Vite dev server
- `npm run build` — build production bundle (output in `dist/`)
- `npm run preview` — locally serve the production build for preview
- `npm run lint` — run ESLint across the project

Verify scripts in `package.json` to match your environment. The current `package.json` contains dependencies for React 19 and Tailwind 4; if you upgrade any major packages, re-check plugin compatibility.

## Contributing

If you want to contribute:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feat/my-feature`.
3. Make changes and run the dev server to test.
4. Open a pull request describing your changes.

## License & credits

Icons by lucide-react. Images in the example are sourced from Falcone Official Facebook Page, Linkding and Website.

