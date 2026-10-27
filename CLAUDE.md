# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Working rules (all Nura repos)

The full flow is in [docs/WORKFLOW.md](https://github.com/utkarshpayal/period-buddy/blob/main/docs/WORKFLOW.md) in the app repo. The guard hook in `.claude/hooks/guard.mjs` enforces the 🔒 rules.

1. **Branch first:** `git switch -c <type>/<name> origin/staging` (`feat`, `fix`, `chore`, `docs`, `refactor`). 🔒 No commits on `main`.
2. 🔒 **Never push to `main` or force-push `main`/`staging`.** Push your branch only when asked, then a PR goes to `staging`. `main` changes only through a reviewed `staging` → `main` release PR, or a hotfix PR (branch from `origin/main`, then merge `main` back into `staging`).
3. **Leave other people's uncommitted changes alone.** Don't commit, stash, reset or discard them; use a `git worktree` from `origin/staging` instead.
4. 🔒 **Secrets:** never read, print, copy or commit `.env*` (except `.env.example`), keystores or credentials, or read secret values from AWS. Name the key and let the person set the value. A new env var goes in `.env.example` and in every environment (prod and staging).
5. 🔒 **Production is opt-in:** read-only checks are fine. Changing AWS, Vercel, EAS production or live data needs the person's explicit go-ahead, and the hook asks each time. Do it on staging first.
6. **Verify before done:** run `npm run lint` and `npm run build`, the same checks CI runs. Report failures with their output.
7. **Docs in the same change:** keep this file, the API docs and the cross-repo contracts (WORKFLOW.md §7) in sync with the code.
8. **Stay in scope**, and list other problems you spot instead of fixing them unasked. Work inline: no subagents unless asked.
9. **Commits and PR titles:** `<type>(<scope>): <summary>`, imperative, lowercase, ≤ 72 characters. Fill in the PR template.

## This repo: marketing website

The public site at `thenura.care`: product pages, blog (read live from the API), legal pages, contact and newsletter forms, account deletion, and the `/app` deep-link bounce page. React 19 · Vite · React Router 7 · Oxlint, JavaScript (no TypeScript). How it fits the system: [ARCHITECTURE.md](https://github.com/utkarshpayal/period-buddy/blob/main/docs/ARCHITECTURE.md). Detail: `README.md`, `docs/README.md`.

```bash
npm install
npm run dev       # http://localhost:5173
npm run lint      # oxlint; CI check
npm run build     # CI check
```

- **Backend:** `src/lib/api.js`. `VITE_API_URL` (includes `/api`); unset it's `http://localhost:5000/api` in dev and `https://www.backend.thenura.care/api` in builds. Vercel Preview for `staging` should set `https://stage.backend.thenura.care/api`, or previews post forms to production.
- **Layout:** `src/pages/` (one per page), `src/components/` (`blog/` for the journal), `src/hooks/` (`useDocumentMeta`, `useSeo`, `useReveal`), `src/lib/blog.js`.
- **Blog bodies** are rich text from the admin editor: Markdown plus the allowlist in `src/lib/richText.js` (palette-named `<span data-color>`, `<mark data-color>`, `<u>`), rendered by `react-markdown` with `rehype-raw` then `rehype-sanitize` (that schema is the allowlist; anything else is stripped). ` ```chart ` blocks draw with `components/blog/RichChart.jsx`; an image with a Markdown title becomes a figure with a caption.
- **A new page** goes in `src/App.jsx` **and** `public/sitemap.xml`.
- **Don't edit `public/.well-known/`** without a reason: `assetlinks.json` holds the Play signing-key fingerprints, and a wrong one stops thenura.care links from opening the app.
- **`/security` must match** the backend's `docs/SECURITY.md`. Legal pages change only on request.
- **Deploy:** Vercel; `main` → production. The forms need this origin in the backend's `ALLOWED_ORIGINS`.
