<!--
Title: <type>(<scope>): <summary>   type = feat | fix | refactor | perf | docs | chore | test | ci | revert
       imperative, lowercase, no trailing period, ≤ 72 chars. Release PRs (staging → main): "release: <yyyy-mm-dd> — <theme>"
Feature PRs target `staging`. Flow: https://github.com/utkarshpayal/period-buddy/blob/main/docs/WORKFLOW.md
Delete what doesn't apply.
-->

## Summary

<!-- What and why, in 1–3 sentences. -->

## Changes

-

## Impact

<!-- "None" where nothing applies. -->

- **Backend changes needed / merged first:**
- **New page** (added to `src/App.jsx` and `public/sitemap.xml`?):
- **Legal / `/security` / `.well-known` touched:**

## How to test

1.

## Checklist

- [ ] Targets `staging` (or is a `staging` → `main` release / hotfix)
- [ ] `npm run lint` passes
- [ ] `npm run build` passes
- [ ] Checked on mobile width and in both themes if styles changed
- [ ] No secrets, `.env*` or credentials committed
