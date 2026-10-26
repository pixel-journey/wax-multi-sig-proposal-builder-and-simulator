# wax-multi-sig-proposal-builder-and-simulator

> **Trust label:** `educational-reference`  
> **Status:** Passes **1–30** freeze + **31–34** live WharfKit tier (2026-10-26)

Simulate **M-of-N / weighted** multi-sig, probe `eosio.msig`, and optionally broadcast with **packed multi-action trx** via WharfKit (**Anchor / Cloud Wallet / Wombat**).

## Live tier

- Multi-wallet SessionKit login
- Confirm-required propose / approve / exec / cancel
- Inner actions JSON editor (or single-transfer fallback)
- TAPOS + per-contract ABI packing + `proposal_hash`

[WHARFKIT.md](./WHARFKIT.md) · [POLICY.md](./POLICY.md)

```bash
npm install && npm test && npm run dev
```

MIT — Pixel Journey
