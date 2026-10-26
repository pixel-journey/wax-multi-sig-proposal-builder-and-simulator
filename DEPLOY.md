# Deploy

**Trust label:** educational-reference

## Local

```bash
npm install
npm test
npm run dev
```

## Vercel (recommended for static/demo host)

1. Import `pixel-journey/wax-multi-sig-proposal-builder-and-simulator`
2. Framework: **Next.js** (auto)
3. Build: `npm run build` · Output: default
4. No secrets required for simulation-only use

Live wallet login needs HTTPS and browser wallet extensions / Cloud Wallet popup allowlist for your domain.

## CI

GitHub Actions (`.github/workflows/ci.yml`) runs on `main`:

- `npm test` (vitest pure engines)
- `npm run typecheck`
- `npm run build`

No mainnet broadcast in CI.
