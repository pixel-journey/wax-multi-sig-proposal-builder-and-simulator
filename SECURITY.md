# Security — eosio.msig shapes

## Closed in tests

| Issue | Behavior |
| --- | --- |
| Impossible threshold | flagged high risk |
| Single-approver heavy threshold | flagged |
| Wrong chain id | refuse trust (pinned mainnet id) |

## Not closed (production)

| Concern | Guidance |
| --- | --- |
| Broadcast | Host must confirm with a wallet; unit tests do not send |
| Inner trx | Review every action before propose |
| Approver set | Wrong accounts = stuck or captured proposal |

## Attack angles

1. Proposing a transfer the board did not intend.  
2. Executing on a fork after ignoring chain id.  
3. Confusing permission multi-sig with msig and updating the wrong authority.

## Honesty limits

No private keys in the lab. Prefer WharfKit. [docs.wax.io permissions](https://docs.wax.io/build/core-concepts/permissions) · [eosio.msig](https://github.com/AntelopeIO/reference-contracts/tree/main/contracts/eosio.msig).
