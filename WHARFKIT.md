# WharfKit + eosio.msig

**Trust label:** educational-reference

## Live path (host dApp)

1. Install `@wharfkit/session` (+ wallet plugins).
2. `login` / `restore` → `session`.
3. Build **inner** transaction (e.g. transfer) with WharfKit serializers.
4. Outer actions from `examples/msigActions.ts`:
   - `propose` → `approve` (each level) → `exec`
5. `session.transact({ actions })` per step (or carefully batched).

## This repo

| Piece | Role |
|-------|------|
| Threshold / risk engines | Offline simulation |
| Action builders | Real `eosio.msig` payload shapes |
| Table probe | Optional live `get_table_rows` |
| UI | Does **not** auto-broadcast; host wires WharfKit |

Prefer WharfKit over greenfield eosjs / Anchor Link-only stacks.
