# Education: two kinds of “multi-sig” on WAX

## 1. Account permission multi-sig

`account` permissions (`owner` / `active` / custom) with **weighted keys or accounts** and a **threshold**. Any action authorized by that permission needs enough weight. Edited via `eosio::updateauth` (see permission visualizer / key-rotation repos).

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
