# wax-multi-sig-proposal-builder-and-simulator

> **Trust label:** `educational-reference`  
> **Status:** Passes **1–20 frozen** (2026-10-25)

Simulate **M-of-N / weighted** multi-sig thresholds, probe `eosio.msig` tables, validate optional proposal hashes, export plans, and build real action shapes for **WharfKit** host apps.

## Highlights

- Threshold + risks + aggregate score; presets; undo; validation
- MD / JSON / CSV copy **and** download; JSON import; notes
- `propose` / `approve` / `unapprove` / `exec` / `cancel` (+ lifecycle + single-action copy)
- Soft-fail probes (`get_info`, `get_account`, proposal/approvals tables) with RPC presets + WAX chain-id check
- Optional `proposal_hash` with hex validation

## Live path

[WHARFKIT.md](./WHARFKIT.md) · [POLICY.md](./POLICY.md)

```bash
npm install && npm test && npm run dev
```

MIT — Pixel Journey
