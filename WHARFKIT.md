# WharfKit + eosio.msig

**Trust label:** educational-reference  
**Tier:** multi-wallet + multi-action editor (Pass 34+)

## Wallets (optional peers)

- Anchor
- My Cloud Wallet
- Wombat (package may be older/deprecated upstream — loaded if install succeeds)

## Inner actions

- Empty JSON → single `eosio.token::transfer` fallback
- Or paste a JSON **array** of plain actions → `packProposeActions`
- Sample loader: 2× transfer in the live panel

## Pack pipeline

`get_info` TAPOS → per-account `get_abi` → `Action.from` × N → `Transaction` → `propose.data.trx` + optional `proposal_hash`

Prefer **WharfKit** over eosjs / Anchor Link-only stacks.
