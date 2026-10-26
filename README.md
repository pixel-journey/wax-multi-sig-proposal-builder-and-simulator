# wax-multi-sig-proposal-builder-and-simulator

> **Trust label:** `educational-reference`  
> **Status:** Passes **1–30** freeze + **31–33** live WharfKit tier (2026-10-26)

Simulate **M-of-N / weighted** multi-sig, probe `eosio.msig`, and optionally broadcast with **packed multi-action trx** via WharfKit (Anchor + Cloud Wallet).

## Live tier

- SessionKit login (Anchor / My Cloud Wallet)
- Confirm-required propose / approve / exec / cancel
- `packProposeActions`: TAPOS + per-contract ABI → `propose.data.trx`
- `proposal_hash` from packed transaction id for approve

[WHARFKIT.md](./WHARFKIT.md) · [POLICY.md](./POLICY.md)

```bash
npm install && npm test && npm run dev
```

MIT — Pixel Journey
