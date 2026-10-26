# WharfKit + eosio.msig

**Trust label:** educational-reference  
**Tier:** live session + packed propose trx (Pass 32+)

## Install

```bash
npm install
```

## Live path

1. **Login (Anchor)** → SessionKit.
2. Optional: **Preview packed propose.trx** (no wallet) — TAPOS + ABI pack only.
3. Choose step → confirm checkbox → **Broadcast**.

### Propose packing (`packProposeTrx.ts`)

1. `APIClient` → `get_info()` → `getTransactionHeader(expireSeconds)`.
2. `get_abi("eosio.token")` → `Action.from({ transfer… }, abi)`.
3. `Transaction.from({ …header, actions })`.
4. `Serializer.objectify(transaction)` → `propose.data.trx`.
5. `session.transact({ action: proposeAction })`.

Approve / exec / cancel do not need an inner packed trx.

## Prefer WharfKit

Use **WharfKit Session** over greenfield eosjs or Anchor Link-only stacks for new WAX dApps.
