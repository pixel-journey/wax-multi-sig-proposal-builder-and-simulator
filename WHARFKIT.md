# WharfKit + eosio.msig

**Trust label:** educational-reference  
**Tier:** live session + guarded broadcast (Pass 31+)

## Install

```bash
npm install
# pulls @wharfkit/session, @wharfkit/antelope, wallet-plugin-anchor, web-renderer
```

## Live path (this repo)

1. Open the app → **LIVE WHARFKIT (GUARDED)** panel.
2. **Login (Anchor)** → `createWaxSessionKit()` + `kit.login()`.
3. Choose step: `propose` | `approve` | `exec` | `cancel`.
4. Check the confirm box (required — no auto-broadcast).
5. **Broadcast** → `session.transact({ action })`.

Code: `examples/sessionKit.ts`, `examples/proposeTrx.ts`, `examples/LiveExecutionPanel.tsx`.

## Propose / `trx` serialization

`eosio.msig::propose` expects a **serialized transaction** in `data.trx`, not only a loose actions array.

Educational envelope (`buildProposeEnvelope`) ships inner `eosio.token::transfer` actions for learning. For production mainnet success:

1. Resolve ABIs via WharfKit / APIClient.
2. Build a `Transaction` with correct TAPOS header (`get_info`).
3. Serialize and place that object in `propose.data.trx`.
4. Then `session.transact({ action: proposeAction })`.

Approve / unapprove / exec / cancel do **not** need that packed inner trx — only propose does.

## Prefer WharfKit

Use **WharfKit Session** over greenfield eosjs or Anchor Link-only stacks for new WAX dApps.
