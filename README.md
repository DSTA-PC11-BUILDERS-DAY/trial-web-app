# Chuckle Fetch

A deliberately small test app for exercising the "AI builds a web app → deploys to Vercel" flow end to end.

**What it does:** fetches a random dad joke from the public [icanhazdadjoke.com](https://icanhazdadjoke.com) API on button click, and lets you save/remove favorites, persisted in the browser via `localStorage`.

Stack: Next.js 14 (App Router) + TypeScript + Tailwind CSS. No backend, no database, no environment variables required — about as low-friction as a Vercel deploy gets.

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Deploy to Vercel

Option A — via the Vercel dashboard:
1. Push this folder to a GitHub repo.
2. Go to https://vercel.com/new and import the repo.
3. Leave all settings as default (Vercel auto-detects Next.js) and click Deploy.

Option B — via the CLI:
```bash
npm install -g vercel
vercel
```
Follow the prompts; no project configuration is needed beyond accepting the defaults.

## Project structure

```
app/
  layout.tsx      root layout + metadata
  page.tsx        the entire UI (client component)
  globals.css     Tailwind entrypoint
```
