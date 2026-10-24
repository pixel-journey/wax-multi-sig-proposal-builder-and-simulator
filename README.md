# wax-multi-sig-proposal-builder-and-simulator

> **Trust label:** `educational-reference`  
> **Status:** Passes **1–10**

Simulate **M-of-N / weighted** multi-sig thresholds, export plans, probe chain tables, and build real **`eosio.msig`** action shapes for **WharfKit** host apps.

## Features

- Threshold + risks + aggregate risk score
- Presets, bulk approve/clear, undo stack
- Validation, localStorage drafts
- MD / JSON / CSV — copy **and** download
- `propose` / `approve` / `exec` (+ sequence modes)
- Soft-fail `get_account` + proposal/approvals table probes + row normalize

## Live path

[WHARFKIT.md](./WHARFKIT.md) — install `@wharfkit/session`, serialize inner trx, `session.transact`.

```bash
npm install && npm test && npm run dev
```

MIT — Pixel Journey
