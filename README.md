# wax-multi-sig-proposal-builder-and-simulator

> **Trust label:** `educational-reference`  
> **Status:** Passes **1–15 frozen** (2026-10-25)

Simulate **M-of-N / weighted** multi-sig thresholds, probe `eosio.msig` tables, export plans, and build real action shapes for **WharfKit** host apps.

## Highlights

- Threshold + risks + aggregate score; presets; undo; validation
- MD / JSON / CSV copy **and** download; JSON import
- `propose` / `approve` / `exec` / `cancel` builders + lifecycle export
- Soft-fail probes (`get_account`, proposal/approvals tables) with RPC presets
- Related permission / session-key / offline-queue blueprints

## Live path

[WHARFKIT.md](./WHARFKIT.md) · [POLICY.md](./POLICY.md)

```bash
npm install && npm test && npm run dev
```

MIT — Pixel Journey
