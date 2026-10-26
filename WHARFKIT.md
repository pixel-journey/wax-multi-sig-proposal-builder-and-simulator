# WharfKit + eosio.msig

**Trust label:** educational-reference  
**Tier:** packed multi-action propose + multi-wallet (Pass 33+)

## Wallets

SessionKit loads:

- `@wharfkit/wallet-plugin-anchor`
- `@wharfkit/wallet-plugin-cloudwallet` (optional if install succeeds)

## Propose packing

`packProposeActions` / `packProposeTransfer`:

1. `get_info` → TAPOS header  
2. `get_abi` per contract account  
3. `Action.from` × N  
4. `Transaction.from` → `Serializer.objectify` → `propose.data.trx`  
5. Optional `proposal_hash` from transaction id (64-hex) for later `approve`

## Live path

Login → preview pack (optional) → confirm → broadcast step.

Prefer **WharfKit** over eosjs / Anchor Link-only stacks.
