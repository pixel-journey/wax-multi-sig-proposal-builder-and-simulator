# wax-multi-sig-proposal-builder-and-simulator

> **Trust label:** `educational-reference`  
> **Status:** Passes **1–7** (expanding)

Simulate **M-of-N / weighted** multi-sig thresholds, export plans, and build real **`eosio.msig`** action shapes for host apps that use **WharfKit**.

## Features

- Threshold snapshot + risk analysis + aggregate risk score
- Presets (2-of-3, 3-of-5, weighted), bulk approve/clear
- Validation (Antelope names, proposal_name rules)
- MD / JSON / CSV export
- `propose` / `approve` / `unapprove` / `cancel` / `exec` builders
- Soft-fail `get_account` + `eosio.msig` proposal **and** approvals table probes
- localStorage drafts

## Live path

Host installs `@wharfkit/session`, serializes inner trx, then `session.transact` on msig actions. See [WHARFKIT.md](./WHARFKIT.md) and [POLICY.md](./POLICY.md).

```bash
npm install && npm test && npm run dev
```

MIT — Pixel Journey
