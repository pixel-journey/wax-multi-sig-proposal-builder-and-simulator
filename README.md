# wax-multi-sig-proposal-builder-and-simulator

> **Trust label:** `educational-reference`  
> **Status:** Passes **1–25 frozen** (2026-10-25)

Simulate **M-of-N / weighted** multi-sig thresholds, probe `eosio.msig` tables, share drafts via URL, validate hashes and threshold feasibility, and build real action shapes for **WharfKit** host apps.

## Highlights

- Threshold + risks + feasibility + remaining weight; presets; undo; validation
- MD / JSON / CSV / lifecycle copy **and** download; JSON import; notes; share URL
- `propose` / `approve` / `unapprove` / `exec` / `cancel` (+ single-action copy)
- Soft-fail probes (`get_info`, `get_account`, tables) with RPC presets + WAX chain-id
- Optional `proposal_hash` with hex validation

## Live path

[WHARFKIT.md](./WHARFKIT.md) · [POLICY.md](./POLICY.md)

```bash
npm install && npm test && npm run dev
```

MIT — Pixel Journey
