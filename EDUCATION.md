# Education — two kinds of multi-sig on WAX

> **Rung:** `npm test` passes (56). Chain id checked against `wax.greymass.com` `get_info` on 2026-11-20. Tests build action shapes; they do **not** broadcast.  
> **The test is the rule.** Permissions: [docs.wax.io permissions](https://docs.wax.io/build/core-concepts/permissions). Named proposals: [eosio.msig](https://github.com/AntelopeIO/reference-contracts/tree/main/contracts/eosio.msig).

A longer copy also lives under [examples/EDUCATION.md](examples/EDUCATION.md).

## Learning outcomes

| Level | After this file |
| --- | --- |
| Beginner | Separate account-threshold multi-sig from `eosio.msig` proposals |
| Intermediate | Read progress, feasibility, and score 60 = high not critical |
| Masterclass | Never treat HTTP 200 without the pinned chain id |

---

## Beginner — locked numbers

| Call | Locked result |
| --- | --- |
| three weights of 1, one approved, threshold 2 | approved weight `1`, not met, progress `50` |
| `weightNeeded` on that snapshot | `1` |
| threshold 10, one approver of weight 1 | risks `impossible` + `single-approver`; score `60`, label `high` (critical ≥75) |
| threshold 5, weights 1+1 | not feasible |
| threshold 2, weights 1+1 | feasible |
| majority of three 1s | `2` (`floor(3/2)+1`) |
| supermajority of three 1s | `2` (`ceil(3*2/3)`) — same until total grows |
| `WAX_MAINNET_CHAIN_ID` | `1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4` |

```bash
npm test
```

---

## Intermediate — two objects

| Kind | What it is | Edited / run via |
| --- | --- | --- |
| Account permission multi-sig | Weighted keys/accounts + threshold on `owner`/`active`/custom | `eosio::updateauth` |
| `eosio.msig` proposal | Named proposal + inner `trx` | `propose` / `approve` / `exec` / `cancel` |

This repo focuses on **eosio.msig shapes**. Permission trees live in the visualizer / auditor / rotation cluster.

### Lifecycle

1. **propose** — requested approvals + inner transaction  
2. **approve** / **unapprove**  
3. **exec** — once threshold met  
4. **cancel** — proposer (or authorized)

---

## Masterclass

### Common mistakes

1. Calling a permission threshold an msig proposal.  
2. Treating score 60 as critical (critical starts at 75).  
3. Broadcasting without WharfKit / without re-checking chain id.

### Cluster

| Need | Repo |
| --- | --- |
| msig shapes | **This** |
| Permission tree | [visualizer](https://github.com/pixel-journey/wax-permission-visualizer-and-editor) |
| Self-active on owner | [auditor](https://github.com/pixel-journey/wax-account-permission-auditor) |
| Rotate without lockout | [rotation](https://github.com/pixel-journey/wax-safe-key-rotation-assistant) |
| Weighted helpers | [social recovery](https://github.com/pixel-journey/wax-social-recovery-and-key-backup-tools) |
| Limited daily keys | [session keys](https://github.com/pixel-journey/wax-wharfkit-session-keys-and-linked-permissions) |

Wallets for education: **Anchor**, **My Cloud Wallet**. Prefer **WharfKit**.

---

## What this course will not teach

- Auto-broadcast of production treasury moves
- That score bands freeze accounts
