# Architecture — Multi-Sig Proposal Builder & Simulator

**Trust label:** educational-reference

## Two layers

| Layer | What it is |
|-------|------------|
| **Simulation** | Pure TypeScript engines + Next.js UI: threshold math, risk, share URL, exports, soft-fail RPC probes |
| **Live (guarded)** | WharfKit SessionKit (Anchor / Cloud Wallet) + packed `eosio.msig` actions; confirm-required broadcast |

```
UI (app/page.tsx)
  ├─ BUILD / SIMULATION  → examples/* engines, storage, share, probes
  └─ LIVE WHARFKIT       → sessionKit → packProposeActions → session.transact
```

## Key modules

- `examples/engines.ts` — threshold snapshot, risks
- `examples/msigActions.ts` — outer `eosio.msig` action shapes
- `examples/packProposeTrx.ts` — TAPOS + ABI-encoded inner `trx`
- `examples/sessionKit.ts` — SessionKit factory (recommended wallets only)
- `examples/LiveExecutionPanel.tsx` — login, pack preview, confirm, broadcast

## What this is not

- Not a full DAO product or historical proposal indexer
- Not account-permission multi-sig editor (see permission-visualizer repos for that)
- Not auto-broadcast; user must confirm each live step

## Safety

Validation before copy/broadcast, impossible-threshold notices, soft-fail probes, educational trust label on all live paths.
