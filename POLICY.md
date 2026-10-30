# Policy — multi-sig proposal builder

**Trust label:** `educational-reference`  
**Status:** Passes 1–38 · educational + live tier complete (2026-10-30)

## In scope

- Pure threshold / approval / risk engines (unit-tested, offline-safe)
- `eosio.msig` propose · approve · unapprove · cancel · exec education
- Inner `trx` packing (TAPOS + ABI) for real proposals
- Optional live path via **WharfKit** with explicit confirm
- Wallets: **Anchor** · **My Cloud Wallet** only

## Out of scope

- Silent mainnet broadcast from tests or pure engines
- Full proposal indexer / explorer product
- Abandoned wallet plugins
- Permanent account permission multi-sig design alone → visualizer / social recovery / rotation

## Rules

- Every live step requires an explicit confirm checkbox
- Prefer WharfKit over eosjs / Anchor Link for greenfield
