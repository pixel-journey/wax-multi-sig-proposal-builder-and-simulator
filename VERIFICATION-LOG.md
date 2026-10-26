# Verification Log

**Trust label:** educational-reference  
**Updated:** 2026-10-26 (Pass 35 complete)

| Claim | Status | Evidence |
| --- | --- | --- |
| Pure engines | unit | vitest under `examples/` |
| Pack / parse helpers | unit | packProposeTrx.test.ts, parseInnerActions.test.ts |
| Live session.transact | host + wallet | LiveExecutionPanel — not CI-executed |
| Wallets | policy | Anchor + Cloud Wallet only |

```bash
npm install && npm test
```
