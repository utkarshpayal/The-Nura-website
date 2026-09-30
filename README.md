# The Nura — Marketing Website

The public site at **[thenura.care](https://thenura.care)**. It covers the product
pages, app download, legal pages, the contact form, the newsletter signup and the
account-deletion page that the app stores require.

React 19 · Vite · React Router 7 · Oxlint. Hosted on Vercel.
Backend: [period-buddy-be](https://github.com/utkarshpayal/period-buddy-be).
All docs: [docs/README.md](docs/README.md) for this repo, and the system
[ARCHITECTURE.md](https://github.com/utkarshpayal/period-buddy/blob/main/docs/ARCHITECTURE.md) for how it fits with the app and API.

---

## Quick start

Requirements: Node.js 20 and npm.

```bash
npm install
npm run dev          # http://localhost:5173
```

Optional `.env` (copy `.env.example`):

| Key | Purpose |
|---|---|
| `VITE_API_URL` | Backend base **including `/api`**. Defaults: `http://localhost:5000/api` in `npm run dev`, `https://www.backend.thenura.care/api` in production builds. |

Only the contact form, newsletter and account deletion call the API. Every other page is static.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Vite dev server |
| `npm run build` | Production build into `dist/` (CI) |
| `npm run preview` | Serve `dist/` locally |
| `npm run lint` | Oxlint (CI) |

---

## Pages

| Path | Page |
|---|---|
| `/` | Home |
| `/features`, `/pricing`, `/download`, `/diagnostics` | Product |
| `/about`, `/careers`, `/contact`, `/faq` | Company |
| `/privacy`, `/terms`, `/data-protection` (`/hipaa`) | Legal |
| `/security` | Security & Safety: how data is protected, in plain words. Must match the API's `docs/SECURITY.md` (see [docs/README.md](docs/README.md)) |
| `/account/delete` | Delete an account (email code → confirm). Required by Google Play / App Store. |
| `/app` | Deep-link bounce page into the mobile app |

## Project structure

```
index.html               Meta tags, favicon, Open Graph
public/
├── logo.png             Favicon + og:image (keep this path, since social previews link to it)
├── robots.txt, sitemap.xml
└── .well-known/         apple-app-site-association + assetlinks.json: let
                         thenura.care links open the app (iOS Universal Links /
                         Android App Links, package com.uvin124.thenura)
src/
├── main.jsx, App.jsx    Entry + routes
├── pages/               One file per page
├── components/          Nav, Footer, Newsletter, PhoneFrame, …
├── hooks/               useDocumentMeta (per-page title/meta), useReveal (scroll animations)
├── lib/api.js           Backend calls (contact, newsletter, account deletion)
└── assets/images/       logo.png (in-page logo), screens/ (app screenshots)
vercel.json              SPA rewrites
```

> **Don't change `.well-known/` casually.** `assetlinks.json` holds the app's
> signing-key fingerprint. If it doesn't match the Play Store signing key,
> thenura.care links stop opening the app.

## Deployment

Hosted on Vercel (`vercel.json`). Vercel's Git integration builds `main` with `npm run build` and serves `dist/`. Add a new page to `src/App.jsx` **and** to
`public/sitemap.xml`. The backend must allow this origin in `ALLOWED_ORIGINS` for the
forms to work.

## Contributing

Branch from `main`, open a PR. CI runs `npm ci`, `npm run lint` and `npm run build`.
