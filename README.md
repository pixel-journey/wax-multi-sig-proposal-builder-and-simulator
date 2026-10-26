# wax-multi-sig-proposal-builder-and-simulator

> **Trust label:** `educational-reference`  
> **Status:** Passes **1–30** freeze + **Pass 31** live WharfKit tier (2026-10-26)

Simulate **M-of-N / weighted** multi-sig thresholds, probe `eosio.msig` tables, and optionally **login + broadcast** guarded steps via **WharfKit**.

## Highlights

- Offline: threshold tools, risk, share URL, exports, table probes
- Live (guarded): Anchor login, confirm-required propose / approve / exec / cancel
- Action builders for real `eosio.msig` payload shapes

## Docs

[WHARFKIT.md](./WHARFKIT.md) · [POLICY.md](./POLICY.md) · [ARCHITECTURE.md](./ARCHITECTURE.md)

```bash
npm install && npm test && npm run dev
```

MIT — Pixel Journey
