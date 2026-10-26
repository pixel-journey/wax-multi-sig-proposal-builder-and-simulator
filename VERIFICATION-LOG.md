# Verification Log

**Trust label:** educational-reference  
**Updated:** 2026-10-26 (Pass 32)

| Claim | Status | Evidence |
| --- | --- | --- |
| packProposeTransfer export | unit | packProposeTrx.test.ts |
| Live pack against RPC | soft-fail in UI | Preview packed propose.trx |
| Live session.transact | host + wallet | not CI-executed |

```bash
npm install && npm test
```
