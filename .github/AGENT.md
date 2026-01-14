# AGENT Guide — personal_website_v2

This expands on `.github/copilot-instructions.md` with runnable examples, troubleshooting tips, and CI/preview notes.

Quick context
- CRA TypeScript React app. Entry: `src/index.tsx`, routing and app shell: `src/App.tsx`.
- Pages live in `src/containers/`, shared UI in `src/components/`, theme in `src/theme.ts`.

Common tasks (copyable)
- Install deps:
  ```bash
  npm ci
  ```
- Start dev server (hot reload):
  ```bash
  npm start
  # open http://localhost:3000
  ```
- Run tests (interactive):
  ```bash
  npm test
  ```
- Create production build and serve locally:
  ```bash
  npm run build
  npx serve -s build
  # open http://localhost:5000 (serve default)
  ```

Where to make changes
- Add pages: create `src/containers/MyPage.tsx` (export default React.FC), then register in `src/App.tsx` inside `<Routes>`.
- Reusable UI: add or modify components under `src/components/` (e.g., `Menu.tsx`, `Footer.tsx`).
- Update theme tokens in `src/theme.ts`; App uses MUI `ThemeProvider` in `src/App.tsx`.

Routing & Hosting notes
- Uses `react-router-dom` (client-side routing). Production server must fallback to `index.html` for unknown paths (see `nginx.conf`). When changing server config, preserve that behavior.

three.js and visual components
- `src/components/ParticleBackground.tsx` demonstrates `three` usage. Visual components may rely on `window` or DOM; avoid SSR-style refactors without local visual testing.
- If a build fails with three errors, run `npm run build` locally to get the production stack trace — dev server sometimes masks production-only errors.

Testing guidance
- Project uses CRA test runner. Keep tests focused and avoid heavy DOM/three rendering in unit tests; prefer snapshot tests for simple components and integration/visual checks manually.

Examples
- Add a route + simple page example:
  1. `src/containers/MyPage.tsx`
     ```tsx
     import React from 'react';

     const MyPage: React.FC = () => <div id="mypage">My Page</div>;

     export default MyPage;
     ```
  2. Register route in `src/App.tsx` inside `<Routes>`:
     ```tsx
     <Route path="/mypage" element={<MyPage />} />
     ```

CI and preview notes
- Use `npm ci` in CI to avoid environment drift. Build output is `build/`.
- This repo includes GitHub Actions workflows for CI and for deploying the `build/` artifact to GitHub Pages (see `.github/workflows`).

Troubleshooting
- Build-only failures: reproduce with `npm run build` locally.
- Hydration warnings: often come from animation libraries or mismatched initial render; check `React.StrictMode` and `framer-motion` usage.
- Visual regressions: run `npm run build` and view via `npx serve -s build` to compare.

If you want, I can also:
- Add a `preview/` GitHub Action that deploys PR previews to a ephemeral preview host (Netlify/Vercel). This requires account/setup for those services.
