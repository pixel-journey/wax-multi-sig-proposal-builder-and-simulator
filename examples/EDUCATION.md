# Education: two kinds of “multi-sig” on WAX

> **Rung:** `npm test` passes (56). The chain id below was checked against `wax.greymass.com` `get_info` on 2026-11-20. The tests build action shapes. They do not broadcast.  
> **The test is the rule.** Permission weights: [WAX permissions](https://docs.wax.io/build/core-concepts/permissions). The named-proposal contract is `eosio.msig` in [AntelopeIO/reference-contracts](https://github.com/AntelopeIO/reference-contracts/tree/main/contracts/eosio.msig).

## Predict, then run

| Call | Locked result |
| --- | --- |
| three weights of 1, one approved, threshold 2 | approved weight `1`, not met, progress `50` |
| `weightNeeded` on that snapshot | `1`, line contains `Need 1` |
| threshold 10, one approver of weight 1 | risk id `impossible` |
| threshold 5, weights 1+1 | `checkThresholdFeasibility` is not ok |
| threshold 2, weights 1+1 | feasible |
| `suggestMajorityThreshold` of three 1s | `2` (`floor(3/2)+1`) |
| `suggestSupermajorityThreshold` of three 1s | `2` (`ceil(3*2/3)`). Same number. Not a stricter board until the total is larger. |
| empty approver list | majority suggestion `1` |
| `WAX_MAINNET_CHAIN_ID` | `1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4` |

Do not treat a permission threshold and an `eosio.msig` proposal as the same object. The first is `updateauth` on an account. The second is `propose` / `approve` / `exec` on `eosio.msig`.

## 1. Account permission multi-sig


`account` permissions (`owner` / `active` / custom) with **weighted keys or accounts** and a **threshold**. Any action authorized by that permission needs enough weight. Edited via `eosio::updateauth` (see permission visualizer / key-rotation / auditor).

## 2. `eosio.msig` proposals (this repo)

A **named proposal** on the privileged `eosio.msig` contract:

1. **propose** — proposer submits requested approvals + an **inner transaction** (`trx`)
2. **approve** / **unapprove** — each requested level signs off (optional `proposal_hash`)
3. **exec** — once threshold met, anyone can execute the inner trx
4. **cancel** — proposer (or authorized) can cancel

This builder focuses on **(2)**: simulate thresholds, build action JSON, pack real inner `trx`, and optionally broadcast with WharfKit.

## Wallets we recommend here

- **Anchor**
- **My Cloud Wallet**

Skip abandoned or sold-off wallet stacks in educational examples.

## Security cluster map

| Need | Repo |
| --- | --- |
| msig propose/approve/exec shapes | **This** |
| Permission tree | [visualizer](https://github.com/pixel-journey/wax-permission-visualizer-and-editor) |
| Same-account active on owner | [auditor](https://github.com/pixel-journey/wax-account-permission-auditor) |
| Rotate keys without locking the account | [rotation](https://github.com/pixel-journey/wax-safe-key-rotation-assistant) |
| Weighted helpers, not shared seeds | [social recovery](https://github.com/pixel-journey/wax-social-recovery-and-key-backup-tools) |
| Owner key stays on a device | [hardware](https://github.com/pixel-journey/wax-hardware-wallet-integration-patterns) |
| Daily actions off the owner key | [session keys](https://github.com/pixel-journey/wax-wharfkit-session-keys-and-linked-permissions) |
