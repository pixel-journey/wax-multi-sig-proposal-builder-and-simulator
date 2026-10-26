# Policy

**Threshold / risk engines** are pure math (safe offline, unit-tested).

**Live multi-sig** uses native `eosio.msig` (propose / approve / unapprove / cancel / exec) with a real **WharfKit** `session.transact` path in `LiveExecutionPanel`.

Rules:

- No silent broadcast from unit tests or pure engines.
- Every live step requires an explicit confirm checkbox.
- Wallets: **Anchor** and **My Cloud Wallet** only (no abandoned plugins).
- Propose packs inner `trx` via TAPOS + ABI (`packProposeActions`); approve may attach `proposal_hash`.

See [WHARFKIT.md](./WHARFKIT.md).
