# Personal Website

A personal portfolio website built with React, TypeScript, MUI, and Three.js.

## Tech Stack

- **React 18** with TypeScript
- **MUI v7** for UI components and theming
- **Three.js** for interactive particle background
- **Framer Motion** for page transitions and animations
- **React Router v7** for client-side routing
- **Notistack** for snackbar notifications

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm

### Installation

```bash
npm install
```

### Running Locally

```bash
npm start
```

Runs the app in development mode at [http://localhost:3000](http://localhost:3000). The page will hot-reload on edits.

### Running Tests

```bash
npm test
```

Launches the test runner in interactive watch mode.

### Building for Production

```bash
npm run build
```

Creates an optimised production build in the `build` folder. The output is minified and filenames include content hashes for cache busting.

### Deployment

After building, the `build` folder contains static files ready to be deployed to any static hosting provider:

- **Netlify** - connect your repo or drag and drop the `build` folder
- **Vercel** - connect your repo; it auto-detects Create React App
- **GitHub Pages** - use the `gh-pages` package or deploy the `build` folder manually
- **AWS S3 / CloudFront** - upload the `build` folder to an S3 bucket configured for static hosting

For GitHub Pages specifically:

```bash
npm install --save-dev gh-pages
```

Add to `package.json`:

```json
"homepage": "https://yourusername.github.io/repo-name",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```

Then run:

```bash
npm run deploy
```

## Project Structure

```
src/
  components/      # Reusable components (Menu, Footer, ParticleBackground, Transition)
  containers/      # Page-level components (Home, LandingPage, About, Portfolio, Contact)
  assets/          # Static assets (images)
  theme.ts         # MUI light/dark theme configuration
  App.tsx           # Root component with routing and theme provider
```
