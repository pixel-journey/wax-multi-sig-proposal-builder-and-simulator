# Security — eosio.msig shapes

## Closed in tests

| Issue | Behavior |
| --- | --- |
| Impossible threshold (weights cannot reach) | flagged high risk |
| Single-approver heavy threshold | flagged |
| Wrong chain id | refuse trust (pinned mainnet id) |
| Progress / remaining weight snapshot | computed from config, not chain |

## Not closed (production)

| Concern | Guidance |
| --- | --- |
| Broadcast | Host must confirm with a wallet; unit tests do not send |
| Inner trx | Review **every** action before propose |
| Approver set | Wrong accounts = stuck or captured proposal |
| Expiration | Stale proposals must not execute after board intent changes |

## Attack angles

1. Proposing a transfer the board did not intend.  
2. Executing on a fork after ignoring chain id.  
3. Confusing **permission** multi-sig (weighted keys on owner/active) with **eosio.msig** named proposals — and updating the wrong authority.  
4. One weight ≥ threshold so a single key can approve alone while the board believes it is M-of-N.  
5. Auto-broadcasting propose/approve/execute from educational UI.

## Honesty limits

No private keys in the lab. Simulation is not chain state. Prefer WharfKit for live propose/approve/execute. [docs.wax.io permissions](https://docs.wax.io/build/core-concepts/permissions) · [eosio.msig](https://github.com/AntelopeIO/reference-contracts/tree/main/contracts/eosio.msig) · [WharfKit](https://wharfkit.com/). Cluster: [visualizer](https://github.com/pixel-journey/wax-permission-visualizer-and-editor) · [social recovery](https://github.com/pixel-journey/wax-social-recovery-and-key-backup-tools).
