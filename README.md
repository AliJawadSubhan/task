# Voyage Travel Agency

A responsive travel-agency website built with Next.js, TypeScript, Tailwind CSS, Framer Motion, and GSAP. It includes searchable booking controls, destination showcases, travel services, animated testimonials, and responsive layouts for mobile, tablet, and desktop.

## Requirements

- Node.js 20 or newer
- npm 10 or newer

## Start locally

1. Open a terminal in the project folder:

   ```bash
   cd D:\Jawad-projects\task
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the Next.js development server in Webpack mode:

   ```bash
   npm run dev -- --webpack
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Production build

```bash
npm run build -- --webpack
npm start
```

The production server also runs at [http://localhost:3000](http://localhost:3000) by default.

## Main project folders

```text
src/app/          Next.js routes and page composition
src/components/   Reusable sections, controls, and animations
public/           Images and static assets
vendor/gsap/      Local GSAP utilities used by the interface
```

## Notes

- Search results and booking data are mocked; no backend or external travel API is required.
- Webpack mode is recommended for this workspace because its current dependency folder may be linked from another local project.
- Stop the development server with `Ctrl+C`.
