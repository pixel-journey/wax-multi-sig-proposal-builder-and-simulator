# wax-multi-sig-proposal-builder-and-simulator

> **Trust label:** `educational-reference`  
> **Status:** Passes **1–30** freeze + **31–32** live WharfKit / packed propose (2026-10-26)

Simulate **M-of-N / weighted** multi-sig thresholds, probe `eosio.msig`, and optionally **login + broadcast** with **packed inner trx** for propose.

## Live tier

- Anchor login via WharfKit SessionKit
- Confirm-required propose / approve / exec / cancel
- `packProposeTransfer`: `get_info` TAPOS + `eosio.token` ABI → `propose.data.trx`

[WHARFKIT.md](./WHARFKIT.md) · [POLICY.md](./POLICY.md)

```bash
npm install && npm test && npm run dev
```

MIT — Pixel Journey
