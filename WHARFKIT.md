# WharfKit + eosio.msig

**Trust label:** educational-reference

## Recommended wallets (only)

| Wallet | Plugin |
|--------|--------|
| **Anchor** | `@wharfkit/wallet-plugin-anchor` |
| **My Cloud Wallet** | `@wharfkit/wallet-plugin-cloudwallet` |

Do **not** wire abandoned or sold-off wallets (e.g. former Wombat stacks). Prefer current, maintained options only.

## Pack pipeline

`get_info` TAPOS → per-account `get_abi` → `Action.from` × N → `Transaction` → `propose.data.trx` + optional `proposal_hash`

Prefer **WharfKit Session** over eosjs / Anchor Link-only stacks for new WAX dApps.
